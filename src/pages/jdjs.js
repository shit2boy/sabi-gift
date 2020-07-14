* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :root {
    --primaryColor:#58B852;
    --mainWhite: #ffffff;
    --offWhite: #f7f7f7;
    --mainBlack: #222;
    --mainGrey: #ececec;
    --mainText: ##707070;
    --mainTransition: all 0.3s linear;
    --mainSpacing: 3px;
    --lightShadow: 2px 5px 3px 0px rgba(0, 0, 0, 0.5);
    --darkShadow: 4px 10px 5px 0px rgba(0, 0, 0, 0.5);
  }
  /* globals */
  body {
    padding-top: 66px;
    color: var(--mainBlack);
    background: var(--mainWhite);
    font-family: Trebuchet MS;
    line-height: 1.4;
  }
  h1 {
    font-size: 3em;
    line-height: 1;
    margin-bottom: 0.5em;
  }
  h2 {
    font-size: 2em;
    margin-bottom: 0.75em;
  }
  h3 {
    font-size: 1.5em;
    line-height: 1;
    margin-bottom: 1em;
  }
  h4 {
    font-size: 1.2em;
    line-height: 1.25;
    margin-bottom: 1.25em;
  }
  h5 {
    font-size: 1em;
    font-weight: bold;
    margin-bottom: 1.5em;
  }
  h6 {
    font-size: 1em;
    font-weight: bold;
    margin-bottom: 1.5em;
  }
  
  .btn-primary {
    display: inline-block;
    text-decoration: none;
    letter-spacing: var(--mainSpacing);
    color: var(--mainBlack);
    background: var(--primaryColor);
    padding: 0.4rem 0.9rem;
    border: 3px solid var(--primaryColor);
    transition: var(--mainTransition);
    text-transform: uppercase;
    cursor: pointer;
  }
  .btn-primary:hover {
    background: transparent;
    color: var(--primaryColor);
  }
  .loading {
    text-transform: capitalize;
    text-align: center;
    margin-top: 3rem;
  }
  .error {
    text-align: center;
    text-transform: uppercase;
    margin: 2rem 0;
  }
  
  /* end of globals */
  /* Navbar */
  .navbar1 {
    
  
    background: var(--mainWhite);
    z-index: 1;
  }
  
  /* .nav-links a:hover {
    color: var(--primaryColor);
  } */
  
  .show-nav {
    height: 100px;
  }
  @media screen and (min-width: 768px) {
    .nav-btn {
      display: none;
    }
    .nav-center {
      max-width: 1170px;
      margin: 0 auto;
      display: flex;
    }
    .nav-links {
      height: auto;
      display: flex;
      margin-left: 4rem;
    }
    .nav-links a {
      margin: 0 1rem;
      padding: 0.5rem 0;
    }
  }
  /* end of navbar */
  /* Hero */
  
  .defaultHero{
    min-height: calc(100vh - 66px);
    background: url("./images/landing/bg.png") center/cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* End of Hero */
  /* Banner */
  .banner {
    display: inline-block;
    background: rgba(0, 0, 0, 0.5);
    color: var(--mainWhite);
    padding: 2rem 1rem;
    text-align: center;
    text-transform: capitalize;
    letter-spacing: var(--mainSpacing);
  }
  .banner h1 {
    font-size: 2.5rem;
  }
  .banner div {
    width: 10rem;
    height: 5px;
    background: var(--primaryColor);
    margin: 1.7rem auto;
  }
  .banner p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  @media screen and (min-width: 576px) {
    .banner {
      padding: 2rem 3rem;
    }
    .banner h1 {
      font-size: 3rem;
    }
  }
  @media screen and (min-width: 992px) {
    .banner {
      padding: 2rem 6rem;
    }
    .banner h1 {
      font-size: 4rem;
    }
  }
  /* End of Banner */
  /* Title */
  .section-title {
    text-align: center;
    margin-bottom: 4rem;
  }
  .section-title h4 {
    font-size: 2rem;
    letter-spacing: var(--mainSpacing);
    text-transform: capitalize;
    margin-bottom: 1rem;
  }
  .section-title div {
    width: 5rem;
    height: 5px;
    margin: 0 auto;
    background: var(--primaryColor);
  }
  /* end of Title */
  
  