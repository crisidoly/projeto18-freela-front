import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <h1>Homepage</h1>
      <Link to="/signup">Cadastre-se</Link>
    </div>
  );
}