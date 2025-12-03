import "../Styles/Footer.css";

export default function Footer() {
  return (
    <footer>
      <p>
        PlantCare Planner © {new Date().getFullYear()}
      </p>
      <p>
        Grow | Track | Heal Your Plants
      </p>
    </footer>
  );
}
