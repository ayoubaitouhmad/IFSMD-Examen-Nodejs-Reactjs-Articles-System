-- auto-generated definition
create table files
(
    id         bigint auto_increment
        primary key,
    file_name  varchar(255)                         null,
    file_type  varchar(255)                         null,
    file_path  varchar(255)                         null,
    storage    varchar(255)                         null,
    created_at datetime default current_timestamp() null,
    updated_at datetime default current_timestamp() null,
    path       varchar(255)                         null
);


-- auto-generated definition
create table users
(
    id               bigint auto_increment
        primary key,
    username         varchar(20)  not null,
    name             varchar(20)  not null,
    bio              varchar(20)  null,
    role             varchar(20)  null,
    email            varchar(255) null,
    password         varchar(255) null,
    profile_image_id bigint       null,
    created_at       datetime(6)  null,
    updated_at       datetime(6)  null,
    constraint FK__USERS_FILES
        foreign key (profile_image_id) references files (id)
            on update cascade on delete set null
);


-- auto-generated definition
create table articles
(
    id               bigint auto_increment
        primary key,
    title            varchar(255)         null,
    description      varchar(255)         null,
    content          text                 not null,
    is_featured_blog tinyint(1) default 0 null,
    author_id        bigint               null,
    views            int        default 0 null,
    article_image_id bigint               null,
    created_at       datetime(6)          null,
    updated_at       datetime(6)          null,
    constraint FK_ARTICLES_FILES
        foreign key (article_image_id) references files (id)
            on update cascade on delete set null,
    constraint FK__ARTICLES_USERS
        foreign key (author_id) references users (id)
            on update cascade on delete set null
);



CREATE TABLE categories
(
    id          bigint AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    description TEXT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE article_category
(
    article_id  bigint,
    category_id bigint,
    PRIMARY KEY (article_id, category_id),
    FOREIGN KEY (article_id) REFERENCES articles (id) ON DELETE CASCADE ,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
);


INSERT INTO categories (name, description) VALUES ('Technology', 'This category is focused on technology related topics.');
INSERT INTO categories (name, description) VALUES ('Health', 'This category is focused on health related topics.');
INSERT INTO categories (name, description) VALUES ('Travel', 'This category is focused on travel related topics.');
INSERT INTO categories (name, description) VALUES ('Food', 'This category is focused on food related topics.');
INSERT INTO categories (name, description) VALUES ('Lifestyle', 'This category is focused on lifestyle related topics.');
INSERT INTO categories (name, description) VALUES ('Education', 'This category is focused on education related topics.');
INSERT INTO categories (name, description) VALUES ('Finance', 'This category is focused on finance related topics.');
INSERT INTO categories (name, description) VALUES ('Fitness', 'This category is focused on fitness related topics.');
INSERT INTO categories (name, description) VALUES ('Entertainment', 'This category is focused on entertainment related topics.');
INSERT INTO categories (name, description) VALUES ('Politics', 'This category is focused on politics related topics.');
INSERT INTO categories (name, description) VALUES ('Science', 'This category is focused on science related topics.');
INSERT INTO categories (name, description) VALUES ('Music', 'This category is focused on music related topics.');
INSERT INTO categories (name, description) VALUES ('Fashion', 'This category is focused on fashion related topics.');
INSERT INTO categories (name, description) VALUES ('Business', 'This category is focused on business related topics.');
INSERT INTO categories (name, description) VALUES ('Sports', 'This category is focused on sports related topics.');
INSERT INTO categories (name, description) VALUES ('Parenting', 'This category is focused on parenting related topics.');
INSERT INTO categories (name, description) VALUES ('DIY', 'This category is focused on diy related topics.');
INSERT INTO categories (name, description) VALUES ('Photography', 'This category is focused on photography related topics.');
INSERT INTO categories (name, description) VALUES ('Gaming', 'This category is focused on gaming related topics.');
INSERT INTO categories (name, description) VALUES ('Marketing', 'This category is focused on marketing related topics.');
INSERT INTO categories (name, description) VALUES ('Environment', 'This category is focused on environment related topics.');
INSERT INTO categories (name, description) VALUES ('Real Estate', 'This category is focused on real estate related topics.');
INSERT INTO categories (name, description) VALUES ('Automotive', 'This category is focused on automotive related topics.');
INSERT INTO categories (name, description) VALUES ('Beauty', 'This category is focused on beauty related topics.');
INSERT INTO categories (name, description) VALUES ('Career', 'This category is focused on career related topics.');
INSERT INTO categories (name, description) VALUES ('Books', 'This category is focused on books related topics.');
INSERT INTO categories (name, description) VALUES ('Art', 'This category is focused on art related topics.');
INSERT INTO categories (name, description) VALUES ('History', 'This category is focused on history related topics.');
INSERT INTO categories (name, description) VALUES ('Personal Growth', 'This category is focused on personal growth related topics.');
INSERT INTO categories (name, description) VALUES ('Relationships', 'This category is focused on relationships related topics.');
INSERT INTO categories (name, description) VALUES ('Movies', 'This category is focused on movies related topics.');
INSERT INTO categories (name, description) VALUES ('Pets', 'This category is focused on pets related topics.');
INSERT INTO categories (name, description) VALUES ('Cooking', 'This category is focused on cooking related topics.');
INSERT INTO categories (name, description) VALUES ('Productivity', 'This category is focused on productivity related topics.');
INSERT INTO categories (name, description) VALUES ('Spirituality', 'This category is focused on spirituality related topics.');
INSERT INTO categories (name, description) VALUES ('Social Media', 'This category is focused on social media related topics.');


