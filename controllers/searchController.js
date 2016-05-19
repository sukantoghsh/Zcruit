angular.module('zcruit').controller('searchController', ['$scope', '$location', '$http', function($scope, $location, $http) {


  $scope.initials = function(name) {
    name = name.split(' ');
    return name[0][0] + name[1][0];
  };

  $scope.phoneFormat = function(phone) {
    if (phone) {
      return phone.substring(0, 3) + '-' + phone.substring(3, 6) + '-' + phone.substring(6, 10)
    }
  };

  $scope.boolToText = function(bool) {
    return bool === '0' ? 'No' : 'Yes';
  }

  $scope.setSelectedPlayer = function(player) {
    $scope.selected = player;
    console.log(player);

    if (player.Zscore >= 8.5) {
      $scope.zscoreExplanation = "A score of " + player.Zscore + " means this player is strongly likely to commit.";
    } else if (player.Zscore >= 5.5) {
      $scope.zscoreExplanation = "A score of " + player.Zscore + " means this player is moderately likely to commit.";
    } else {
      $scope.zscoreExplanation = "A score of " + player.Zscore + " means this player is unlikely to commit.";
    }
  };

  $http.get('https://zcruit-bpeynetti.c9users.io/php/query.php?query=' + encodeURIComponent('SELECT * FROM Players p, HighSchools h, Coaches c WHERE p.HighSchool_id = h.HS_id AND p.AreaCoach_id = c.Coach_id'))
  .then(function(response) {
    $scope.players = eval(response.data);
    $scope.setSelectedPlayer($scope.players[0]);
  });

  $scope.test = "hi";

  $scope.zscorePopover = {
    templateUrl: 'zscore_popover.html',
    title: "Zcruit Score"
  }

  $scope.openBigBoard = function() {
    window.open('big_board.html', '_self');
  }
}]);

// MODAL CONTROLLERS
angular.module('zcruit').controller('ModalDemoCtrl', function ($scope, $uibModal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;


  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('zcruit').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance,$timeout, items, lodash) {

  $scope.items = items;

  $timeout(function () {
        $scope.$broadcast('rzSliderForceRender');
    });

  //Range slider config
  $scope.minRangeSlider = {
      minValue: 200,
      maxValue: 400,
      options: {
          floor:150,
          ceil: 500,
          step: 2
      }
  };

  $scope.positionModel = [];
  $scope.positionData = [
    {id: 'QB', label: "QB"},
    {id: "RB", label: "RB"},
    {id: "WR", label: "WR"},
    {id: "SB", label: "SB"},
    {id: "G/C", label: "G/C"},
    {id: "OT", label: "OT"},
    {id: "CB", label: "CB"},
    {id: "SAF", label: "SAF"},
    {id: "LB", label: "LB"},
    {id: "D", label: "D"},
    {id: "DT", label: "DT"},
    {id: "ATH", label: "ATH"},
    {id: "K", label: "K"},
    {id: "P", label: "P"},
    {id: "LS", label: "LS"},
    {id: "Walk on", label: "Walk on"}
  ];

  $scope.statusModel = [];
  $scope.statusData = [
    {id:0, label: "0 - Commit"},
    {id:1, label: "1 - Offer"},
    {id:2, label: "2 - Active recruit"},
    {id:3, label: "3 - Evaluation needed"},
    {id:4, label: "4 - FBS recruit"},
    {id:5, label: "5 - Walk on"},
    {id:6, label: "6 - Reject"}
  ];


  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
