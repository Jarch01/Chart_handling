let myChart;

fetch("http://localhost:3000/items").then(
    res => res.json()
).then( (data) => {
    let html = "";
    data.forEach(item => {
        html += '<li onclick="handleItemClick('+ item.id +')">'+ item.name +'</li>'
    });
    document.getElementById("item-list").innerHTML = html;
})



function handleItemClick(itemId)
{
    fetch("http://localhost:3000/items/"+itemId)
    .then(res => res.json())
    .then( (data) => {
        createChart(data)
    })
}


function createChart(item)
{
    let ctx = document.getElementById('chart').getContext('2d');

    var canvas = document.getElementById('chart');

// Ensure the canvas exists
if (canvas.hasAttribute('style')) {
    myChart.destroy();
}

// Define data for the chart
let data = {
    labels: item.labels,
    datasets: [{
        label: item.category,
        data: item.data, 
        type: 'bar',
        borderWidth: 1
    },
    {
        label: `Average ${item.category}`,
        data: item.data, 
        type: 'bar',
        borderWidth: 1
    },
    {
        label: item.category,
        data: item.data,
        type: 'line',
        lineTension: 0.4
    }
]
};

// Define chart options
let options = {
    plugins: {
        title: {
            display: true,
            text: item.name,
            font: {
                weight: 'bold',
                size: 30,
            },
            color: 'black'
        },
    },
    scales: {
        x: {
            title: {
                display: true,
                text: "X Axis",
                font: {
                    weight: 'bold',
                    size: 24,
                },
                color: 'black'
            }
        },
        y: {
            title: {
                display: true,
                text: "Y Axis",
                font: {
                    weight: 'bold',
                    size: 24,
                },
                color: 'black'
            }
        }
    }
};

// Create the chart
myChart = new Chart(ctx, {
    type: 'bar', // Change this to the type of chart you want (bar, line, pie, etc.)
    data: data,
    options: options
});

}


function search()
{
      // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('search');
  filter = input.value.toUpperCase();
  ul = document.getElementById("item-list");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = li[i].textContent || li[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}