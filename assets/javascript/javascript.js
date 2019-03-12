$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCWEPJv61SN_A2PtxoG1WTTJz83P3XGMFA",
        authDomain: "train-scheduler-d9718.firebaseapp.com",
        databaseURL: "https://train-scheduler-d9718.firebaseio.com",
        projectId: "train-scheduler-d9718",
        storageBucket: "train-scheduler-d9718.appspot.com",
        messagingSenderId: "342177643406"
    };
    firebase.initializeApp(config);


    var trainName = "";
    var destination = "";
    var firstTrainTime = "";
    var frequency = 0;

    var database = firebase.database();

    database.ref().on("child_added", function (childSnapshot) {

        var newRow = $("<tr>")
        var newTD = $("<td>")

        newTD.text(childSnapshot.val().trainName)
        newTD.text(childSnapshot.val().destination)
        newTD.text(childSnapshot.val().firstTrainTime)
        newTD.text(childSnapshot.val().frequency)

        var trainName = childSnapshot.val().trainName
        var destination = childSnapshot.val().destination
        var firstTrainTime = childSnapshot.val().firstTrainTime
        var frequency = childSnapshot.val().frequency

        $(newRow).append("<td>" + trainName + "</td>")
        $(newRow).append("<td>" + destination + "</td>")
        $(newRow).append("<td>" + frequency + "</td>")
        $(newRow).append("<td>" + "Need to figure out" + "</td>")
        $(newRow).append("<td>" + "Need to figure out" + "</td>")

        $("tbody").append(newRow);


    }, function (errorObject) {
        console.log("the read failed:" + errorObject.code)
    });


    $("#submit-train").on("click", function (event) {

        event.preventDefault();

        var trainName = $("#train-name").val().trim();
        var destination = $("#train-destination").val().trim();
        var firstTrainTime = $("#train-time").val().trim();
        var frequency = $("#train-frequency").val().trim();

        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

    });

}); // document.ready close