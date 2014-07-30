/*  
	Your Project Design Creation
	Author: Angelena Ward
*/

(function($){
	
	
	/*
	===============================================
	========================= APPLICATION FUNCTIONS	
	*/
	
	var checkLoginState = function(){
		$.ajax({
			url: 'xhr/check_login.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
				// if user, loadApp()
				// if error, loadLanding()
			}
		});
	};
	

	// 	============================================
	//	SETUP FOR INIT
		
	var init = function(){
	
		checkLoginState();
	};
	
	init();
		
	/*
	===============================================
	======================================== EVENTS	
	*/
	
	/*==========datepicker==========*/
	$(function() {
    	$( ".datepicker" ).datepicker();
  	});
	
	/*==========Sortable==========*/
	 $(function() {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
  });
		
	/*==========Accordion Menu==========*/
	$("#accordion > li").click(function(){

		if(false == $(this).next().is(':visible')) {
			$('#accordion > ul').slideUp(300);
		}
		$(this).next().slideToggle(300);
	});
	
	/*==========Popup Menu==========*/
	$('#accordion > ul:eq(0)').show();
    
  	$('#load').click( function(e) { 
       	loadPopupBox(); 
   	});
        
 	$('#addbtn').click( function() {
      	unloadPopupBox();
   	});

	// TO Unload the Popupbox
   	function unloadPopupBox() {    
      	$('#popup').fadeOut("slow");
     	$("#contain").css({"opacity": "1"}); 
  	}   
	 
    // To Load the Popupbox    
 	function loadPopupBox() {    
     	$('#popup').fadeIn("slow");
      	$("#contain").css({"opacity": "1"});         
   	}        
	
	/*==========Tooltip==========*/
	$('.masterTooltip').hover(function(){
       
	    // Hover over code
        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>').text(title).appendTo('body').fadeIn('slow');
		}, function() {
				
			// Hover out code
			$(this).attr('title', $(this).data('tipText'));
			$('.tooltip').remove();
		}).mousemove(function(e) {
			var mousex = e.pageX + 20; 
			var mousey = e.pageY + 10;
			$('.tooltip').css({ top: mousey, left: mousex })
	});
	
	/*==========Login==========*/
	$('#signinButton').click(function(){
		var user = $('#user').val();
		var pass = $('#pass').val();
		console.log("Tells you password is working");
		$.ajax({
			url:'xhr/login.php',
			type: 'POST',
			dataType: 'json',
			data: {
				username: user,
				password: pass
			},
			success:function(response){
				console.log("Test User");
				if(response.error){
					alert(response.error);
				}else{
					window.location.assign("admin.html");
				};
			}
		});
	});

	/*==========Logout==========*/
	$('#SignOut').click(function(e){
		e.preventDefault;
		$.get('xhr/logout.php', function(){
			window.location.assign('index.html')
		})
	});
	
	/*==========Register==========*/
	$('#registerBtn').on('click', function(){
		var firstname= $('#first').val(),
			lastname= $('#last').val(),
			email= $('#email').val(),
			username= $('#userName').val(),
			password= $('#password').val();
			console.log(firstname+' '+lastname+' '+email+' '+username+' '+password);

		$.ajax({
			url:'xhr/register.php',
			type: 'post',
			dataType: 'json',
			data: {
				firstname: firstname,
				lastname: lastname,
				username: username,
				email: email,
				password: password
			},
	
			success: function(response){
				if (response.error){
					alert(response.error);
				}else{
					window.location.assign('admin.html');
				}
			}
		});
	});

	/*===== Username Display =====*/
	$.getJSON("xhr/check_login.php", function(data){
		console.log(data);
		$.each(data, function(key, val){
			console.log(val.first);
			$(".userID").html("Welcome User: " + val.first_name);
		})
	});
	
	/*==========go to projects page==========*/
	$('#projectsbtn').on('click',function(e){ 
		e.preventDefault();
		window.location.assign('projects.html')
	})

	/*==========Add new Project==========*/
	$('#addbtn').on('click',function(e){ 
		e.preventDefault();
		window.location.assign('#popup')
	})
	
	/*==========Get Project==========*/
	var projects = function(){
	
		$.ajax({
			url: 'xhr/get_projects.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
				if(response.error){
					console.log(response.error);
				}else {

					for(var i=0, j=response.projects.length; i < j; i++){
						var result = response.projects[i];
	
						$(".projects").append(
						//'<div style="border:1px solid black">'+
						'<div id="sortable" class="ui-state-default">'+
						"<input class='projectid' type='hidden' value='" + result.id + "'>"+
						"Project Name: " + result.projectName + "<br>" +
						"Project Description: " + result.projectDescription + "<br>" +
						"Project Due Date: " + result.dueDate + "<br>" +
						"Project Status: " + result.status + "<br>"
						+ '<button class="deletebtn">Delete</button>'
						+ '<button class="editbtn">Edit</button>'
						+ '</div> <br>');
					};
					$('.deletebtn').on('click', function(e){
						console.log('test delete');
						result.id = $(this).parent('div').find('.projectid').val();
						$.ajax({
							url: 'xhr/delete_project.php',
							data: {
								projectID: result.id
							},
							type: 'POST',
							dataType: 'json',
							success: function(response){
								console.log('Testing for success');
			
								if(response.error) {
									alert(response.error);
								} else{
									//console.log(result.id);
									window.location.assign("projects.html");
								};
							}
						});
					});//end delete
				}
			}
		}) 
	}
	projects();
	
	/*==========modal click==========*/	 
	$('.modalClick').on('click', function(e){
		e.preventDefault();
		$('#overlay')
			.fadeIn()
			.find('#modal')
			.fadeIn();
	});
	
	$('.close').on('click', function(e){
		e.preventDefault();
		$('#overlay')
		.fadeOut()
		.find('#modal')
		.fadeOut();
	});
		
	/*==========Add Project==========*/
	$('#addButton').on('click', function(e) {
		e.preventDefault();
		var projName = $('#projectName').val(),
		projDesc = $('#projectDescription').val(),
		projDue = $('#dueDate').val(),
		status = $('input[name = "status"]:checked').prop("id");
	
		$.ajax({
			url: "xhr/new_project.php",
			type: "post",
			dataType: "json",
			data: {
				projectName: projName,
				projectDescription: projDesc,
				dueDate: projDue,
				status: status
			},
			success: function(response) {
				console.log('Testing for success');
	
				if(response.error) {
					alert(response.error);
				} else {
					window.location.assign("projects.html");
				};
			}
		});
	});

	
	/*	
	==================================== END EVENTS 
	===============================================
	*/

})(jQuery); // end private scope


