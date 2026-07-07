import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="empty-state">
      <h1>Lost in the catalog</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn-primary">
        Back Home
      </Link>
    </main>
  );
}
