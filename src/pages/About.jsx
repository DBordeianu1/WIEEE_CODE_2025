export default function About() {
  return (
    <div className="about">
      <h2>About our project</h2>
      <p>
        By Oleksandra, Iman, and Daniela
      </p>
      <div className="card-grid">
        <div className="card">
          <h3>Intergrated features</h3>
          <p>- Uses a weather API to generate outfits suggestions. </p>
        </div>
        <div className="card">
          <h3>The Impact</h3>
          <p>eCloset discourages overconsumption and promotes reusability. In fact, researchers at the University of Waterloo found that <a 
              href="https://www.cbc.ca/news/science/what-on-earth-clothing-disposal-1.7191603#:~:text=Canadians%20toss%20nearly%20500%2C000%20tonnes%20of%20fabric%20items%20every%20year%2C%20according%20to%20researchers%20at%20the%20University%20of%20Waterloo." 
              target="_blank"                                  
              rel="noopener noreferrer"                        
            >
              Canadians toss nearly 500,000 tons of fabric items every year
            </a>.</p>
        </div>
        <div className="card">
          <h3>In the Near Future</h3>
          <p>- If an item of clothing has not been worn in a while, eCloset's chatbot will suggest to donate it to those in need.</p>
          <p>- eCloset's chatbot will not only take into consideration the weather, but also the event that the user is attending when generating the different outfit suggestions.</p>
          <p>- The items of clothing of the user will be tracked using a database. The user will be able to add items through a camera feature.</p>
          <p>- Intergrating user authentication when the user clicks on the login button.</p>
        </div>
      </div>
    </div>
  )
}
