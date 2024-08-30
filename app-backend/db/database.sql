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




INSERT INTO categories (name, description) VALUES
                                               ('Technology', 'Articles related to the latest technology trends and innovations.'),
                                               ('Science', 'Exploring discoveries and advancements in various fields of science.');






INSERT INTO article_category (article_id, category_id) VALUES
                                                           (1, 1),
                                                           (1, 2);

