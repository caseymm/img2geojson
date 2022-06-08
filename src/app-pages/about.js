import React from 'react';

class Details extends React.Component {
  render() {
    return (
      <div className="about">
        <h1>About this project</h1>
      </div>
    );
  }
}

const About = () => {
   return(
    <Details />
   )
}
 
export default About;