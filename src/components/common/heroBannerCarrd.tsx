import React from 'react';
import '../../app/css/bannerCard.css';

function HeroCard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center space-x-6 flex-wrap md:flex-nowrap">
        {/* Card 1 */}
        <figure className="snip1563 flex-shrink-0" style={{ flexBasis: '30%', minWidth: '200px' }}>
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample110.jpg"
            alt="Portrait of Samuel Serif"
            className="w-full h-auto object-cover"
          />
          <figcaption>
            <h3>Samuel Serif</h3>
            <p>
              The only skills I have the patience to learn are those that have no
              real application in life.
            </p>
          </figcaption>
          <a href="#">Learn More</a>
        </figure>

        {/* Card 2 */}
        <figure className="snip1563 flex-shrink-0" style={{ flexBasis: '30%', minWidth: '200px' }}>
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample110.jpg"
            alt="Portrait of Samuel Serif"
            className="w-full h-auto object-cover"
          />
          <figcaption>
            <h3>Samuel Serif</h3>
            <p>
              The only skills I have the patience to learn are those that have no
              real application in life.
            </p>
          </figcaption>
          <a href="#">Learn More</a>
        </figure>

        {/* Card 3 */}
        <figure className="snip1563 flex-shrink-0" style={{ flexBasis: '30%', minWidth: '200px' }}>
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample110.jpg"
            alt="Portrait of Samuel Serif"
            className="w-full h-auto object-cover"
          />
          <figcaption>
            <h3>Samuel Serif</h3>
            <p>
              The only skills I have the patience to learn are those that have no
              real application in life.
            </p>
          </figcaption>
          <a href="#">Learn More</a>
        </figure>
      </div>
    </div>
  );
}

export default HeroCard;
