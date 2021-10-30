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
-- db name : waiters