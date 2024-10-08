import React from 'react';

const ProfileHeader = ({author}) => {

    return (
        <div className="row">
            <div className="col-md-3 text-center">
                <img
                    src="https://images.top10.com/f_auto,q_auto/v1/production/authors/uploads/photo/Frame1968.20240603103350.png"
                    alt="Profile"
                    className="rounded-circle img-fluid border border-danger"
                />
            </div>
            <div className="col-md-9">
                <h1>
                    {author.name}
                </h1>

                <h4>
                    {author.email}
                </h4>

                <p>

                    Suzannah Weiss is a feminist writer, certified sex educator, and Brown
                    University graduate in Cognitive Neuroscience and Gender and Sexuality
                    Studies. In addition to writing for Top10.com, Suzannah has written for major
                    publications such as The New York Times, The Washington Post, Glamour, and
                    Cosmopolitan.

                </p>

                <div>
                    <a href="#" className="btn btn-outline-secondary mr-2">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="btn btn-outline-secondary mr-2">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="btn btn-outline-secondary">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>

            </div>
        </div>
    );
};

const PostItem = ({ id, title, description, created_at }) => {
    return (
        <div id={id} className="media my-4 border-bottom">
            <img
                className="mr-3 img-fluid"
                src="https://media.kasperskydaily.com/wp-content/uploads/sites/92/2023/06/22155410/top-eight-crypto-scams-2023-featured.jpg"
                alt={title}
                style={{ width: '100px', height: '100px' }}
            />
            <div className="media-body">
                <h5 className="mt-0">{title}</h5>
                <p>{description}</p>
                <p className="text-muted">{created_at}</p>
            </div>
        </div>
    );
};

const PostsList = ({posts}) => {
    return (
        <div>
            <h3>Posts by Suzannah Weiss</h3>
            {posts.map((post, index) => (
                <PostItem key={index} {...post} />
            ))}
        </div>
    );
};

const ProfilePage = ({author}) => {
    if (!author) {
        return <div>Loading...</div>;
    }
    return (
        <div className="container my-5">
            <ProfileHeader author={author}   />
            <hr />
            <div className="row">
                <div className="col-md-9">
                    <PostsList posts={author.posts} />
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Master the art of making better choices</h5>
                            <p className="card-text">Read this post!</p>
                        </div>
                        <img
                            className="card-img-bottom"
                            src="https://via.placeholder.com/150"
                            alt="Ad"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
