import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <section className="hero">
        <h2>Welcome to <span className="highlight"> eCloset</span></h2>
        <p>
          Don't know what to wear?
          Click on login to get outfit recommendations!
        </p>
        <button onClick={() => navigate('/about')}>Go to Project Page</button>
      </section>
    </div>
  )
}
