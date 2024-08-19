import React from 'react';

function Sidebar() {
  return (
    <aside className="col-md-4 blog-sidebar">
      <div className="p-3 mb-3 bg-light rounded">
        <h4 className="font-italic">About</h4>
        <p className="mb-0">Etiam porta <em>sem malesuada magna</em> mollis euismod.</p>
      </div>
      {/* More sidebar content like archives and links */}
    </aside>
  );
}

export default Sidebar;
