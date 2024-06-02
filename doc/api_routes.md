# Ordes Api Routes


## "GET" Routes

### '/orders' : 

Return all orders registered in database

### '/orders/{orderId}'

Return order with the corresponding ID 

### '/orders/customer/{customerId}'

Return orders with the corresponding customer ID


## "POST" Routes

### /orders

Add order inside database 

The Order inside the request must contain a **customer_id**"" , **items**[], **order_date**"", **status**""


## "DELETE" Routes

### /orders/{orderId}

Delete the order with corresponding ID

### /orders/customer/{customerId}

Delete orders with the corresponding Customer ID

### /orders/{id}/items

Delete an item inside the order with the corresponding ID

Require the **product_id** inside the request


## "PUT" Routes

### /orders/{id}/items

Add an item inside the order with the corresponding ID



