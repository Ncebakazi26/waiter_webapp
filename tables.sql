create table waiter (
	id serial not null primary key,
    waiter_name text not null,	
);
create table shifts(
	id serial not null primary key,
	shift_days text not null,
	
	-- foreign key (town_id) references towns (town_id)
);
create table manager (
	id serial not null primary key,
    waiter_name text not null,	
);
