# Bamazon

## Overview

An interactive shopping node app where MySQL and Node.JS are used to allow users to purchase items as a customer, view, track and update the product inventory as a manager, and track the total sales by department as an executive.

## Bamazon Customer Portal

The Bamazon Customer Portal allows users to view the current items available for purchase. The user will be prompted to enter the item id# and how many items they wish to purchase. If the item is in stock, the order will be completed and the user will see the total amount of their purchase.

<img width="518" alt="bamazoncustomer" src="https://user-images.githubusercontent.com/1817873/32976236-364e0f68-cbe0-11e7-96e3-aeb36ffff640.PNG">

## Bamazon Manager Portal

The Bamazon Customer Portal allows users to view and edit the inventory of the store. The user will be prompted to choose from the following options:

View products for sale
View low inventory
Add to inventory
Add a new product

## Manager Options 1 & 2

The first option allows the user to see the list of products that are currently for sale, what department the item belongs to, the price of the product and how much stock is left for that product.

The second option allows the user to see a list of all inventory items that have less than 5 items in stock.

<img width="750" alt="bamazonmanager1" src="https://user-images.githubusercontent.com/1817873/32976286-ec174aee-cbe0-11e7-8ae3-9ae64de8ee19.PNG">

<img width="630" alt="bamazonmanagerlowinventory" src="https://user-images.githubusercontent.com/1817873/32976310-55dfa278-cbe1-11e7-9d3d-18fbd7d5dea5.PNG">

The third option allows the user to update the inventory for a specific product. A prompt asks what the id is for the product the user wants to update. A second prompt asks how many items the user wishes to increase the quantity by.

The last option allows the user to add a new product to the inventory. Prompts ask the user for the product id#, the product name, the department name, the price and the stock quantity.

<img width="676" alt="bamazonmanageradd" src="https://user-images.githubusercontent.com/1817873/32976350-f29136fe-cbe1-11e7-933f-f0ddb5b195cf.PNG">

<img width="625" alt="bamazonmanagernew" src="https://user-images.githubusercontent.com/1817873/32976373-8a0c7bba-cbe2-11e7-9b10-3cfa63a1d975.PNG">

## Bamazon Supervisor Portal

The Bamazon Executive Portal allows users to view the total profits of the store categorized by department and add new departments.

<img width="731" alt="bamazonsuperprofit" src="https://user-images.githubusercontent.com/1817873/32976420-5deb0a46-cbe3-11e7-8ccd-342f59f445b2.PNG">

<img width="618" alt="newdeprt" src="https://user-images.githubusercontent.com/1817873/32976448-cb5ab28e-cbe3-11e7-8012-452ca00ffe87.PNG">

## Contributors:

## Parker Preyer GitHub

Technologies Used:

Javascript
nodeJS
MySQL
npm packages:
mysql
inquirer
cli-table

## License

Copyright 2017 UNC Coding Bootcamp - Parker Preyer
