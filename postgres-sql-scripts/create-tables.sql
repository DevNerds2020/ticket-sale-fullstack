create table if not exists hotel_tickets
(
    id           serial
        primary key,
    location     varchar(255) not null,
    price        integer      not null,
    start_date   date,
    end_date     date,
    num_of_guest integer      not null,
    num_of_room  integer      not null
);


create table if not exists airplane_tickets
(
    id             serial
        primary key,
    location       varchar(255) not null,
    price          integer      not null,
    departure_date date,
    return_date    date,
    num_of_guest   integer      not null
);


create table if not exists train_tickets
(
    id             serial
        primary key,
    location       varchar(255) not null,
    price          integer      not null,
    departure_date date,
    return_date    date,
    num_of_guest   integer      not null
);


create table if not exists tickets
(
    id          serial
        primary key,
    ticket_type varchar(50) not null,
    user_id     integer     not null
        references users,
    ticket_id   integer     not null,
    ticket_date date        not null
);


create table if not exists users
(
    id          serial
        primary key,
    username    varchar(300) not null
        unique,
    password    varchar(300) not null,
    email       varchar(50)  not null
        unique,
    created_at  timestamp default now(),
    gender      varchar(10),
    phone       varchar(20),
    address     varchar(255),
    city        varchar(100),
    state       varchar(100),
    zip         varchar(20),
    country     varchar(100),
    national_id varchar(20),
    passport_id varchar(20),
    birth_date  date
);
