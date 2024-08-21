

create table file_document
(
    id         bigint auto_increment
        primary key,
    data       varchar(255) null,
    file_name  varchar(255) null,
    file_type  varchar(255) null,
    created_at datetime(6)  null,
    updated_at datetime(6)  null,
    path       varchar(255) null
);




create table users
(
    id               bigint auto_increment
        primary key,
    email            varchar(255) null,
    name             varchar(20)  not null,
    password         varchar(255) null,
    role             varchar(255) null,
    username         varchar(20)  not null,
    profile_image_id bigint       null,
    created_at       datetime(6)  null,
    updated_at       datetime(6)  null,
    constraint UK4unapofvpijp79n4j3sheoun7
        unique (profile_image_id),
    constraint FKl3qc0qmq8x3v29tlv6v1lf0k1
        foreign key (profile_image_id) references file_document (id)
);

create table articles
(
    id           bigint auto_increment
        primary key,
    content      text         not null,
    created_at   datetime(6)  null,
    title        varchar(255) null,
    updated_at   datetime(6)  null,
    author_id    bigint       null,
    description  varchar(255) null,
    dates_format varchar(255) null,
    constraint FKe02fs2ut6qqoabfhj325wcjul
        foreign key (author_id) references users (id)
);


drop table  comments;
create table comments
(
    id      bigint auto_increment
        primary key,
    comment longtext null,
    article_id bigint,
    author_id bigint,
    constraint fk__comments_articles
        foreign key (article_id) references articles (id),
    constraint fk__comments_users
        foreign key (author_id) references users (id)
);



alter table articles
    modify updated_at datetime(6) null after is_featured_blog;

alter table articles
    modify created_at datetime(6) null after updated_at;

alter table articles
    modify author_id bigint null after description;

alter table articles
    drop column dates_format;


alter table articles
    add views int default 0 null after author_id;

