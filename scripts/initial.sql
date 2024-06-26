create schema estore;

create table estore.categories ( id int not null, category varchar(45) default null, parent_category_id int default null, primary key (id) );

insert into estore.categories (id, category, parent_category_id) values (1, 'Men', null), (2, 'Women', null), (3, 'Kids', null), (4, 'Casual Wear', 1), (5, 'Party Wear', 2), (6, 'Foot Wear', 2), (7, 'Accessories', 3);

create table estore.products ( id int not null, name varchar(45) default null, image varchar(45), description varchar(100) default null, price decimal(10,0) default null, rating int default null, category_id int default null, primary key (id), Key FK_Products_Categories_id(category_id), constraint FK_Products_Categories_id foreign key (category_id) references estore.categories (id) on update cascade on delete cascade);

insert into estore.products (id, name, description, price, rating, category_id, image) values (1, 'Jacket', 'Fine Jacker with high quality material', 100, 5, 4.5, 'shop-1.jpg'), (2, 'Purse', 'Very nice purse', 25, 3, 7, 'shop-2.jpg'), (3, 'Dress', 'Nice party dress', 45, 4, 5, 'shop-3.jpg'), (4, 'Denim Jeans', 'Denim Jeans', 50, 4, 4, 'shop-4.jpg'), (5, 'Laced Boots', 'Premium leather boots', 65, 4, 6, 'shop-5.jpg'), (6, 'Back pack', 'Spacious back pack', 20, 5, 7, 'shop-6.jpg'), (7, 'Ear rings', 'Beautiful ear rings', 10, 4, 7, 'shop-7.jpg'), (8, 'Scarf', 'Matching scarf', 30, 4, 7, 'shop-8.jpg'), (9, 'Boots', 'Black leather boots', 70, 4.5, 6, 'shop-9.jpg');
