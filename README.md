# NetSuite Journal Simulator — Frontend

A React-based frontend for submitting and viewing Journal Entries, connected to the NetSuite Journal Simulator backend.

---

## Tech Stack

| Layer     | Technology                                  |
| --------- | ------------------------------------------- |
| Framework | React, React Router, Context API            |
| Styling   | Bootstrap, Lucide React (icons), Inline CSS |

---

## How to Run

```bash
npm install
npm run dev
```

App will open on: `http://localhost:5173`

> Make sure the backend is running on `http://localhost:3000` before starting the frontend.

---

## Features

- Submit Journal Entry form with validation
- Real-time field error messages
- Success message with auto-generated Journal Entry ID
- View Recent Entries (last 10)
- View All Entries with search, filter, sort, pagination
- CSV export of all entries

---

## Related

- Backend Repo: [netsuite-journal-simulator-backend](https://github.com/username/netsuite-journal-simulator-backend)
