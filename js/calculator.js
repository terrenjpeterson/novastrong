function CalculatorCtrl($scope, $http) {
  $scope.messageSentFlag = 'show';

  var totalTripCost = 0;

  // 
  // this calculates the dollar amount
  //
  $scope.calcEstimate = function() {
    if ($scope.distanceDriven == 'NewportNews')
      {$scope.gasMessage = '150 Miles Round Trip = $75 Gas and Maintenance';
       totalTripCost = 75;}
    else if
       ($scope.distanceDriven == 'Raleigh')
         {$scope.gasMessage = '280 Miles Round Trip = $140 Gas and Maintenance';
          totalTripCost = 140;}
    else if 
       ($scope.distanceDriven == 'Waynesboro')
         {$scope.gasMessage = '160 Miles Round Trip = $80 Gas and Maintenance';
          totalTripCost = 80;}
    else if 
       ($scope.distanceDriven == 'Manassas')
         {$scope.gasMessage = '200 Miles Round Trip = $100 Gas and Maintenance';
          totalTripCost = 100;}

    if ($scope.hotelDuration == 'OneNight')
      {$scope.hotelMessage = 'One Night Hotel = $120 including Room Taxes';
       totalTripCost = totalTripCost + 120;}
    else if
      ($scope.hotelDuration == 'TwoNights')
        {$scope.hotelMessage = 'Two Nights Hotel = $240 including Room Taxes';
         totalTripCost = totalTripCost + 240;}
    else if
      ($scope.hotelDuration == 'ThreeNights')
        {$scope.hotelMessage = 'Three Nights Hotel = $360 including Room Taxes';
         totalTripCost = totalTripCost + 360;}
    else
      {$scope.hotelMessage = 'Assume no hotel costs';}

    if ($scope.eatingOutDuration == 'OneFullDay')
      {$scope.diningMessage = 'One Full Day for feeding 2-3 people = $60';
       totalTripCost = totalTripCost + 60;}
    else if
      ($scope.eatingOutDuration == 'TwoFullDays')
        {$scope.diningMessage = 'Two Full Days for feeding 2-3 people = $120';
         totalTripCost = totalTripCost + 120;}
    else if
      ($scope.eatingOutDuration == 'ThreeFullDays')
        {$scope.diningMessage = 'Three Full Days for feeding 2-3 people = $180';
         totalTripCost = totalTripCost + 180;}
    else 
      {$scope.diningMessage = 'Assume no extra meal costs';}

    $scope.totalMessage = 'Total Trip Cost = $' + totalTripCost + '.00';
    $scope.messageSentFlag = 'hide';
  };

  //
}
