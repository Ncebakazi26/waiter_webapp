create table waiter (
	waiter_id serial not null primary key,
    waiter_name text not null	
);
create table shifts(
	day_id serial not null primary key,
	shift_days text not null
	
);
create table manager (
	id serial not null primary key,
    waiter_id int not null,	
	day_id int not null,
	foreign key (waiter_id) references waiter (waiter_id),
	foreign key (day_id) references shifts (day_id)

);
insert into shifts (shift_days) values ('Sunday');
insert into shifts (shift_days) values ('Monday');
insert into shifts (shift_days) values ('Tuesday');
insert into shifts (shift_days) values ('Wednesday');
insert into shifts (shift_days) values ('Thursday');
insert into shifts (shift_days) values ('Friday');
insert into shifts (shift_days) values ('Saturday');

insert into waiter (waiter_name) values ('Akhona');
insert into waiter (waiter_name) values ('Imolathe');
insert into waiter (waiter_name) values ('Lihle');
insert into waiter (waiter_name) values ('Nceba');
insert into waiter (waiter_name) values ('Sinazo');


-- db name : waiters