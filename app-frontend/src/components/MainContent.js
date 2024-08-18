import React from 'react';

function MainContent() {
  return (
    <div className="col-md-8 blog-main">
      <h3 className="pb-3 mb-4 font-italic border-bottom">
        From the Firehose
      </h3>

      <div className="blog-post">
        <h2 className="blog-post-title">Sample blog post</h2>
        <p className="blog-post-meta">January 1, 2014 by <a href="#">Mark</a></p>
        <p>This blog post shows a few different types of content that’s supported and styled with Bootstrap. Basic typography, images, and code are all supported.</p>
        <hr />
        <p>Cum sociis natoque penatibus et magnis dis parturient montes...</p>
        <blockquote>
          <p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis ornare vel eu leo.</strong></p>
        </blockquote>
      </div>
      {/* More blog-post divs go here */}
    </div>
  );
}

export default MainContent;
