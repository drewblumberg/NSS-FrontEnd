test( "deposit test", function() {
  deepEqual(deposit(1000.00, 250.00), 1250.00, "deposit money adds to balance");
});


test( "withdraw test", function() {
  deepEqual(withdraw(1000.00, 250.00), 750.00, "withdraw money subtracts from balance");
});