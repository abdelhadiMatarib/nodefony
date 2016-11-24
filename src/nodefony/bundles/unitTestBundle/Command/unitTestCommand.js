

nodefony.registerCommand("unitTest", function(){

	var unitTest = function(container, command, options){

		var arg = command[0].split(":");
		command.shift();
		this.kernel = this.container.get("kernel")
		var bundles = this.kernel.bundles;

		this.serviceUnitTest = this.container.get("unitTest");
		this.serviceUnitTest.consoleMochaInit();
				
		var tests = [];

		if(arg[2] == 'all'){
			this.serviceUnitTest.getNodefonyTestFiles( null, tests)
			for(var bundle in bundles){
				this.serviceUnitTest.getBundlesTestFiles( bundle, null, tests);
			}
		} else if(arg[2] == 'bundle'){
			var bundleName = command[0];
			var testName = command[1];
			bundleName = bundleName.replace('Bundle', '');
			if (bundleName === "nodefony" ){
				this.serviceUnitTest.getNodefonyTestFiles( testName, tests);	
			}else{
				this.serviceUnitTest.getBundlesTestFiles( bundleName, testName , tests);
			}
		}

		this.kernel.listen(this, 'onReady', function(kernel){
			switch ( arg[1] ){
				case "list" :
					switch( arg[2] ){
						case "all":
						case "bundle" : 
							var bundleName = '';
							for(var i = 0; i < tests.length ; i++){
								if ( bundleName != tests[i].bundle){
									bundleName = tests[i].bundle;
									this.logger("★★★ BUNDLE : " + bundleName + " ★★★\n","INFO");
								}
								this.logger("       ‣ " + tests[i].name,"INFO");
							}
							this.logger("\033[0m\033[0m","INFO");
							break;
					}
					this.terminate(1);
					break;
				case "launch" :
					switch( arg[2 ]){

						case "single" :								
						case "all":
						case "bundle" : 
							//console.log(tests)
							this.serviceUnitTest.mochaAddTest(tests);
							this.serviceUnitTest.mochaRunTest(function(failures){
								this.terminate(failures);
							}.bind(this));
							break;
						default:
							this.showHelp();
							this.terminate(1);
					}
					break;
				default:
					this.logger(new Error("unitTest   "+command[1] +" bad format"), "ERROR");
					this.showHelp();
					this.terminate(1);
			}
		}.bind(this));
	};	

	return {
		name: "unitTest",
		commands: {
			listAll: ["unitTest:list:all", "List all unit tests"],
			listBundle: ["unitTest:list:bundle bundleName", "List all bundle unit tests"],
			launchAll: ["unitTest:launch:all", "Launch all tests"],
			launchBundle: ["unitTest:launch:bundle bundleName { testfile }", "Launch bundle tests"],
		},
		worker: unitTest
	};

});