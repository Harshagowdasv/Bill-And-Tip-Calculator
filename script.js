var prices = [120, 130, 100, 180, 170, 70, 60, 200, 250, 140];
        var names = [
            "Chilli Chicken",
            "Biriyani",
            "Chicken Kebab",
            "Mutton Curry",
            "Paneer Butter Masala",
            "Veg Fried Rice",
            "Naan",
            "Chicken Manchurian",
            "Fish Fry",
            "Egg Curry"
        ];

        const images = [
        "images/chilli-chicken.jpg", // Chilli Chicken
        "images/Biriyani.jpg", // Biriyani
        "images/Chicken Kebab.jpg", // Chicken Kebab
        "images/Mutton Curry.jpg", // Mutton Curry
        "images/Paneer Butter Masala.jpg", // Paneer Butter Masala
        "images/Veg Fried Rice.jpg", // Veg Fried Rice
        "images/Naan.jpg", // Naan
        "images/Chicken Manchurian.jpeg", // Chicken Manchurian
        "images/Fish Fry.jpg", // Fish Fry
        "images/Egg Curry.jpg"  // Egg Curry
      ];

    const section = document.getElementById("item-section");

    // Dynamically create item inputs with images
    for (let i = 0; i < names.length; i++) {
      section.innerHTML += `
        <div class="item-row">
          <img src="${images[i]}" alt="${names[i]}">
          <input type="number" id="i${i+1}" placeholder="${names[i]}">
        </div>
      `;
    }
   
    document.getElementById("cbtn").onclick = function(){

        var quantities = [];
        var itemDetails = "";
        var total = 0;

        for(i=1; i<=10; i++){
            var qty = parseInt(document.getElementById("i"+i).value);
            if(isNaN(qty)){
                qty=0;
            }
            quantities.push(qty);
            if(qty>0){
                var itemTotal = qty * prices[i-1];
                total = total + itemTotal;
                itemDetails = itemDetails + "<p>" + names[i-1] + "x" + qty + "= ₹" + itemTotal + "</p>";
            }
        }

        var tip = parseFloat(document.getElementById("tip").value);
        var people = parseInt(document.getElementById("np").value);
        if(isNaN(people) || people<=0){
            people = 1;
        }

        var tipAmount = total * tip;
        var finalBill = total + tipAmount;
        var perPerson = finalBill / people;

        document.getElementById("reciept-details").innerHTML =
            itemDetails +
            "<hr>" +
            "<p><strong>Subtotal:</strong> ₹" + total.toFixed(2) + "</p>" +
            "<p><strong>Tip (" + (tip * 100) + "%):</strong> ₹" + tipAmount.toFixed(2) + "</p>" +
            "<p><strong>Total Bill:</strong> ₹" + finalBill.toFixed(2) + "</p>" +
            "<p><strong>Number of Persons:</strong> " + people + "</p>" +
            "<p><strong>Amount per Person:</strong> ₹" + perPerson.toFixed(2) + "</p>"+
            '<button class="btn" onclick="printReceipt()">Download Receipt</button>';


    }

    document.getElementById("resetBtn").addEventListener("click", function () {
        const isDarkMode = document.body.classList.contains("dark-mode");
      
        // Clear inputs and receipt
        document.querySelectorAll("input").forEach(input => input.value = "");
        document.getElementById("reciept-details").innerHTML = "";
      
        // Reapply dark mode if it was active
        if (isDarkMode) {
          document.body.classList.add("dark-mode");
        }
      
        // Optional: Reload event listeners if reset affects them
        window.onload();
      });
      

    function printReceipt() {
        // Save dark mode status
        const isDarkMode = document.body.classList.contains("dark-mode");
        
        const originalContent = document.body.innerHTML;
        const receiptContent = document.getElementById("receipt").innerHTML;
      
        document.body.innerHTML = receiptContent;
        window.print();
        document.body.innerHTML = originalContent;
      
        // Reapply dark mode if it was active
        if (isDarkMode) {
          document.body.classList.add("dark-mode");
        }
      
        // Reattach JS event listeners if needed
        window.onload();
      }
      


      function toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
      
        // Save the mode to localStorage
        if (document.body.classList.contains("dark-mode")) {
          localStorage.setItem("theme", "dark");
        } else {
          localStorage.setItem("theme", "light");
        }
      }
      
      // Load saved theme on page load
      window.onload = function () {
        if (localStorage.getItem("theme") === "dark") {
          document.body.classList.add("dark-mode");
        }
      };
      