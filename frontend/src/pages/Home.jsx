import { useNavigate } from 'react-router-dom'
import FeatureCard from '../components/FeatureCard'

function Home() {
  const navigate = useNavigate()

  return (
    <main>

      <section className="hero-section">

        <div className="hero-content">

          <h1>
            Learn. Share. Connect.
          </h1>

          <p>
            SkillBridge helps students discover skills,
            share knowledge, and connect with other students.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-button"
              onClick={() => navigate('/explore')}
            >
              Explore Skills
            </button>

            <button
              className="secondary-button"
              onClick={() => navigate('/upload-skill')}
            >
              Upload Skill
            </button>

          </div>

        </div>

      </section>


      <section className="features-section">

        <h2>How SkillBridge Works</h2>

        <div className="feature-container">

          <FeatureCard
            icon="🔎"
            title="Find Skills"
            description="Search for skills you want to learn and discover students who can teach them."
          />

          <FeatureCard
            icon="📚"
            title="Share Knowledge"
            description="Share your skills, knowledge, notes, and useful learning content with others."
          />

          <FeatureCard
            icon="🤝"
            title="Connect"
            description="Send connection requests and connect with students who share your interests."
          />

        </div>

      </section>

    </main>
  )
}

export default Home