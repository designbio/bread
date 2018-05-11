$(document).ready(function() {

  /* Today's Date */
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;

  var yyyy = today.getFullYear();
  if(dd<10){
      dd='0'+dd;
  }
  if(mm<10){
      mm='0'+mm;
  }
  var today = dd+'/'+mm+'/'+yyyy;

  $('.link').click(function() {
    var href = $(this).attr('href');
    $('.navbar').find('.active').removeClass('active');
    $('html,body').animate({
      scrollTop: $(href).offset().top}, 'slow');
    $(this).addClass('active');
  });

  var chart = null;

  /* Dummy Data */
  var hours = [1, 2, 3, 4, 5];
  var A = [12, 10, 3, 5, 2, 3];
  var B = [4, 1, 5, 6, 8, 15];
  var C = [10, 12, 13, 9, 11, 3];

  $('input[type=radio][name=organism]').change(function(){
    if ($("input[name=organism][value=Lactobacillus-acidophilus]").is(":checked")) {
      $("#X").prop('checked', true);
      $("#X").attr('disabled', false);
      $("#Y").attr('disabled', true);
      $("#Z").attr('disabled', true);
    }
     else if ($("input[name=organism][value=Lactobacillus-lactis]").is(":checked")) {
      $("#Y").prop('checked', true);
      $("#Y").attr('disabled', false);
      $("#X").attr('disabled', true);
      $("#Z").attr('disabled', true);
    }
    else if ($("input[name=organism][value=C-Milleri]").is(":checked")) {
      $("#Z").prop('checked', true);
      $("#Z").attr('disabled', false);
      $("#X").attr('disabled', true);
      $("#Y").attr('disabled', true);
    }
  });

  function getData() {
    if ($("input[name=organism][value=Lactobacillus-acidophilus]").is(":checked")) {
      return A;
    } else if ($("input[name=organism][value=Lactobacillus-lactis]").is(":checked")) {
      return B;
    } else if ($("input[name=organism][value=C-Milleri]").is(":checked")) {
      return C;
    } else {
      return [];
    }
  };

  $('#generate').click(function() {

    if (chart != null){
        chart.destroy();
    }

    var data = getData();
    var ctx = $('#recipe-graph');
    chart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: hours,
          datasets: [{
            label: 'Organism',
            data: data,
            backgroundColor: [
              'rgba(0, 0, 0, 0)'
            ],
            borderColor: [
                'rgba(255, 204, 106, 1)'
            ],
            borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                },
                scaleLabel: {
                  display: true,
                  labelString:'pH'
                }
            }],
            xAxes: [{
                ticks: {
                    beginAtZero:true
                },
                scaleLabel: {
                  display: true,
                  labelString:'Time'
                }
            }],
        }
      }
    });

    /*
    // code to dynamically update
    $('#organism').change(function(){
      chart.data.datasets[0].data = [];
      chart.data.datasets[0].data = getData();
      chart.update();
    });
    */

    $('.col-change').addClass('col-md-6');
    $('.col-change').removeClass('col-md-12');
    $('#graph').css('display','block');
    $('#hide-btn').css('display', 'block');

  });


  $('#save').on('click', function(e) {

    e.preventDefault();

    var $form = $('form#design-form'),
      url = 'https://script.google.com/macros/s/AKfycbzhEfnv_D_dfIr7fLRjOYaa-uwcPE1B226Nu-HVpkcIkKoyQlUI/exec'

    var formData = $form.serializeArray();
    /* Add Date to JSON */
    var dateObj = {
      name: 'date',
      value: today
    }
    formData['4'] = dateObj;

    var jqxhr = $.ajax({
      url: url,
      method: 'GET',
      dataType: 'json',
      data: formData,
      success: function (response) {
        if (response) {
          setTimeout(function(){
            $("#grow").show();
            $('html,body').animate({
              scrollTop: $('#grow').offset().top}, 'slow');
          }, 1500);
          $('#success').css('display','block');
          $('html,body').animate({
            scrollTop: $('#success').offset().top}, 'slow');
        }
      },
      failure: function (response) {
        alert(response);
      }
    });
  });



});
