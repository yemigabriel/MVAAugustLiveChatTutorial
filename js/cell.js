
var memPhoto ;
//sqlite var here ...
var createStatement = "CREATE TABLE IF NOT EXISTS cellmemberstut (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,  phone TEXT, email TEXT, photo TEXT)";
var selectAllStatement = "SELECT * FROM cellmemberstut ORDER BY id DESC";
var insertStatement = "INSERT INTO cellmemberstut (name, phone, email, photo) VALUES (?, ?, ?, ?)";
var db = openDatabase("MVATUTORIALS", "1.0", "MVA Tutorials", 200000);  // Open SQLite Database

var dataset;
 
var DataType;

$(function() {
    
    initDatabase();

});


$('#homepage').live('pageshow', function(event) {
	
	$('#photo').live('click', function(event) {
	
	event.preventDefault();
  
  if (!navigator.camera) {
      alert("Camera API not supported", "Error");
      return;
  }
  var options =   {   quality: 50,
                      destinationType: Camera.DestinationType.FILE_URI,
                      sourceType: 0,      // 0:Photo Library, 1=Camera, 2=Saved Album
                      correctOrientation: true,
                      allowEdit: true,
                      encodingType: 0     // 0=JPG 1=PNG
                  };

  navigator.camera.getPicture(
      function(imageURI) {

      	var memPhoto;
      	memPhoto = imageURI;
      	$('.photo_img').attr('style','display:inline')
      	$('.photo_img').src = memPhoto;
         
      },
      function() {
          alert('Error taking picture', 'Error');
      },
      options);

  return false;

});

	$('#submitBtn').live('click', function(event) {
	
	//insert member.
	insertRecord();
});

});


$('#memberspage').live('pageshow', function(event) {
	
	$("#cellmembers_list").html('');
    db.transaction(function (tx) {
 	 tx.executeSql(selectAllStatement, [], function (tx, result) {
 	 dataset = result.rows;
 	 console.log(dataset);
 	for (var i = 0, item = null; i < dataset.length; i++) {
  item = dataset.item(i);
  var linkeditdelete = '<li><img width="50px"  height="50px" src="'+item['photo']+'" />' + item['name'] + ' <p style="font-size:14px;color:#333;font-weight:normal"> ' + item['phone'] + '    ' + '<p style="font-size:14px;color:#333;font-weight:normal">' + item['email'] + '</li>';
 $("#cellmembers_list").append(linkeditdelete);
 
            }
 
        });
 
    });

});


// SQLITE HERE

function initDatabase()  // Function Call When Page is ready.
 
{
 try {
  if (!window.openDatabase)  // Check browser is supported SQLite or not.
    {
        alert('Databases are not supported in this browser.');
    }
    else {
        createTable();  // If supported then call Function for create table in SQLite
     }
 }
 catch (e) {
        if (e == 2) {
            // Version number mismatch. 
            console.log("Invalid database version.");
        } else {
            console.log("Unknown error " + e + ".");
        }
        return;
    }
}
 
function createTable()  // Function for Create Table in SQLite.
{
  db.transaction(function (tx) { tx.executeSql(createStatement, [], showRecords, onError); });
}

function showRecords(){}

function onError(tx, error) // Function for Handling Error...
{   alert(error.message);}

function insertRecord() // Get value from Input and insert record . Function Call when Save/Submit Button Click..
{
	var memName = $('#mem_name').val();
	var memPhone = $('#mem_phone').val(); 
	var memEmail = $('#mem_email').val();
	var memPhoto =$('.photo_img').src;
	
    db.transaction(function (tx) { tx.executeSql(insertStatement, [memName, memPhone, memEmail, memPhoto], addedSuccess, onError); });
 }

function addedSuccess()
{
	alert('Member added successfully');
	window.location = 'members.html';
}