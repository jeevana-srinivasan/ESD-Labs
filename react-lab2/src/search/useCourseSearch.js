// Pre-lab section 05 — an effect that fetches: dependencies and cleanup.
//
// useCourseSearch(query) → { results, status }
//
//   - Trim the query. A blank query sends NO request and returns { results: [], status: "idle" }.
//   - Otherwise, GET /api/courses?q=<query> with apiFetch. Build the query string with
//     URLSearchParams (JS Lab 2 §04), so "R&D" can't break the URL.
//       status "loading" while the request is on its way,
//       status "ready" with results = the courses it returned,
//       status "error" if it failed.
//   - Search again whenever the (trimmed) query changes — and only then: get the
//     dependency array right.
//   - Only the LATEST query's answer may reach the screen. Use an `ignore` flag that the
//     effect's cleanup sets to true (JS Lab 2 §09: the same idea as track()).
import { useEffect, useState } from "react";
import { apiFetch } from "../api/client.js";

export function useCourseSearch(query) {
  const q = query.trim();

  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (q === "") {
      return;
    }

    let ignore = false;

    setStatus("loading");
    setResults([]);

    const params = new URLSearchParams({ q });

    apiFetch(`/api/courses?${params}`)
      .then((courses) => {
        if (!ignore) {
          setResults(courses);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!ignore) {
          setResults([]);
          setStatus("error");
        }
      });

    return () => {
      ignore = true;
    };
  }, [q]);

  if (q === "") {
    return { results: [], status: "idle" };
  }

  return { results, status };
}
