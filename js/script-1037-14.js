
var englishQuizMode=false;

var gettingQuizNumOfLetters = "...your answer...";

if(window.location.href.indexOf("/qz/english/") > -1){
  englishQuizMode=true;
  if(window.location.href.indexOf("quiz_letters") > -1){
    var getUrl=window.location.href;
    var quizLetterIndex = getUrl.indexOf("quiz_letters");
    /* QUIZ LETTER INDEX EXAMPLE 3,4,5 ... */
    if(getUrl.slice(quizLetterIndex+13,quizLetterIndex+14)=="&"){
      gettingQuizNumOfLetters = getUrl.slice(quizLetterIndex+12,quizLetterIndex+13) + " letters ...";
      /* QUIZ LETTER INDEX EXAMPLE 10,11,12 ... */
    }else if(getUrl.slice(quizLetterIndex+14,quizLetterIndex+15)=="&"){
      gettingQuizNumOfLetters = getUrl.slice(quizLetterIndex+12,quizLetterIndex+14) + " letters ...";
    }
  }
}

var temp;
var varA_aux=[];
var masterTwelveJS=false;

if(window.location.href.indexOf("MasterTwelve") > -1){
  masterTwelveJS=true;
  temp=3;
  varA_aux=varA;
  varA=varB;
  varB=varA_aux;
}else{
  temp=0;
  traineeDifLevel=0;
}

// 03.05.2023 //
for(let i=0;i<varB.length;i++){
  if(varB[i].match(/^.*<.*?>.*$/g)){
    varB[i]=varB[i].replace(/<|>/g,"_");
  }else if(varB[i].match(/^.*<\?.*$/g)){
    varB[i]=varB[i].replace(/<\?/g,"_?");
  }
}

var mainIndex = 0;

var obj = [];

var pontuation=0;

var sec = 0;

var game = 1;

var isThirdGameOn = false;

var backToGameOne = false;

var gameTwoRunning = false;

var screenWidth;

var screenHeight;

var timer;

var firstMinusTen = true;

var loop = 1;

var errorsRepeating = "";

var firstStage = true;

var keyDownInput=false;

var isTraineeOn=false;

var isNextButtonOn=false;

function returnToMainGame(){
	document.getElementById("study").style.display="block";
	document.getElementById("play-game").removeAttribute("class");

	if(isThirdGameOn){
		if(screenWidth < 450){
			userInputText.blur();
		}else{
			setTimeout(function(){
				/**/
			}, 0);
		}
	}

	if(gameTwoRunning){
		document.getElementById("pontuation2").innerHTML = pontuation.toFixed(1) + "/" + varA.length*2;
	}else{
		updateScore();
	}
}

var minSizeToDualLetters = 100;
var varA2;
var ranNums2;
var ans;
var traineeVerifyLetter = false;
var playAgain2 = false;
var blinkStudyFirstIteration = false;
var x;
var userFirstIteration2=true;
var varA_new_aux;
var varB_new_aux;
var varB_aux;
var varA_aux2;
var realArrayLength;

var varA_rW=[];
var varB_rW=[];

var randomWords_GetVarA_splitted;
var randomWords_RandomIndex;
var randomWords_GetVarA_splitted_lowerCase;
var randomWords_ForLoopIndex;
var varA_rW2=[...varA];
var varB_rW2=[...varB];

if(varB[0]=="#"){
  randomWords_ForLoop();
}

function nextGame3(){
    traineeGameRunning=false;
    nextGameRunning=true;
	invertValues=false;
	gameTwoRunning = false;
	backToGameOne = true;
	traineeVerifyLetter=false;
	firstRowWrongAns=true;
	verifyEqualBoolean=false;
    nextButtonPress=false;
    firstTraineeRepeat=true;

    if(userFirstIteration2){
        // MAKING ARRAY TWICE AFTER HANGMAN GAME //
        if((gameUrlNumber >= 200000)&&(gameUrlNumber<300000)){
          varA_after_hm=varA;
          varA=[...varB,...varA];
          varB=[...varA_after_hm,...varB];
        }

        // CLONING ARRAY IN THE PROPER WAY - IF VARB IS MODIFIED - THE VARB_AUX IS NOT MODIFIED AUTOMATICALLY //
        varB_aux = [...varB];
        varA_aux2 = [...varA];
        varB_new_aux = [...varB];
        varA_new_aux = [...varA];
        realArrayLength=varB_aux.length;
        userFirstIteration2=false;
    }

    /*IF VAR_A CONTAIN AN IMAGE THEN PRELOAD IT*/
    var image_preload=[];
    var imgIndex=0;
    for(i=0;i<varA.length;i++){
        if(varA[i].match(/<img/g)){
            image_preload[imgIndex]=new Image();
            let imagePath=varA[i].replace("<img id='quiz-img' src='../images/","");
            imagePath=imagePath.replace("'>","");
            image_preload[imgIndex].src='../images/'+imagePath;
            imgIndex++;
        }
    }

    if(isNextButtonOn){
        return;
    }

    savingGameInLastGamesMenu();

    forLoopForArraysDCEF();

    borderTopWidth(1);

    document.getElementById("dv1").style.display="block";
    document.getElementById("next-game2-dv3").style.display="block";
    document.getElementById("finish-div").style.display="none";
    document.getElementsByClassName("hide-button")[0].style.display="block";
    document.getElementById('training-mode-btn').value='Game 1';

    // TAKE CARE BEFORE REMOVING THE LINE BELOW //
    //userInputText.setAttribute('onkeyup','keyboardSpecialChars(this.value)');

    userInputText.style.caretColor="auto";
    userInputText.style.backgroundColor="white";
    userInputText.style.color="black";
    userInputText.style.border="1px solid green";

    if(gameUrlNumber >= 100){
        document.getElementById('training-mode-btn').setAttribute('onclick','traineeGame()');
    }else{
        document.getElementById('training-mode-btn').setAttribute('onclick','newStudyGame()');
    }

    if(sessionStorage.getItem(categoryName)){
        sessionStorage.removeItem(categoryName);
    }

	screenWidth=window.innerWidth;
	screenHeight=window.innerHeight;

	document.getElementById("verify").setAttribute("class","verify-vf");

	if(screenWidth>=1020){
		userInputText.style.outline="3px solid lightgreen";
	}else{
	    userInputText.style.outline="2px solid lightgreen";
	}

    var studyText=document.getElementById("study-text");

	if(!userGoBackQuestion){
    	if(!playAgainWrongAns){
    		timer=setInterval(function(){
    			sec++;
    			document.getElementById('timer2').innerHTML=sec;
    			if(sec > 9999){
    				clearInterval(timer);
    			}
    			if((sec == 1)&&(!keyDownInput)){
    				redArrowBlink();
    			}
    			if((sec == 3)&&(!keyDownInput)){
    				blinkStudyFirstIteration = true;
    			}
    		}, 1000);
    		pontuation = 0;
    		sec=0;
    	}
	}

	document.getElementById("see-answer").style.display="none";//block

	document.getElementById("home-link").style.display="block";

	document.getElementById("see-list").style.display="none";

	document.getElementById("return-link2").style.display="none";

	if(screenWidth < 450){
		userInputText.blur();
	}else{
		setTimeout(function(){
			/**/
		}, 250);
	}

	document.getElementById('timer2').innerHTML=sec;

	yyy="";

	userInputText.value=yyy;

	inputTextPlaceholder();

	userInputText.style.visibility="visible";
	document.getElementById("verify").setAttribute("onclick","traineeGameVerify()");
	document.getElementById("verify").style.display="inline";
	document.getElementById("next-button").style.display="none";

	document.getElementById('next-game2-input-text').value="";
	
	document.getElementById("pontuation").style.display="block";
	
	if(!playAgainWrongAns){
		document.getElementById("time").style.display="block";
	}else{
		document.getElementById("time").style.display="none";
		document.getElementById("erros").style.display="block";
		document.getElementById("info-errors").innerHTML=errorsRepeating;
	}

	document.getElementById("verify").setAttribute("onclick","nextGame3verify();");

	isThirdGameOn=true;

	if((!userGoBackQuestion)||(gameFinished)){
	    mainIndex=0;
	}

    gameFinished=false;

	errorA3=[];
	errorB3=[];

	if(firstRowWrongAns){
		var dupIndex;

		if(varA.length==0){
			dupIndex = 0;
		}else{
			dupIndex = varA.length-1;
		}

		// MINIMUM EIGHT WORDS TO REPEAT THE WRONG ANSWERS //
		while(varA.length < 4){

			varA.push(tempA3[dupIndex]);
			varB.push(tempB3[dupIndex]);

			if(varA.length == 4){
				firstRowWrongAns=false;
			}
			dupIndex++
		}
	}

	if(!playAgainWrongAns){
		updateScore();
	}

	document.getElementById("next-game2-dv1").style.display="block";

	var stringLengthWithoutSup=varA[mainIndex];

	var verifySupInString=stringLengthWithoutSup.includes("</sup>");

	if(verifySupInString){
		stringLengthWithoutSup=stringLengthWithoutSup.length-14;
	}else{
		stringLengthWithoutSup=stringLengthWithoutSup.length;
	}

	fontSize();
    dv2_backgroundColor();
	document.getElementById("dv2").innerHTML="<span class='center-text-vertically'>"+varA[mainIndex]+"</span>";

    if(varA[mainIndex].match(/<sup>/gi)){
        document.getElementsByClassName('center-text-vertically')[0].style.paddingTop='10px';
    }

	aleatoryAnswerInputs();
	afterWrongAnswerQuiz();
}

function forLoopForArraysDCEF(){
    c=[];
    c_aux=[];
    d=[];
    e=[];
    f=[];
	for(var i=0;i<varA.length;i++){
	    /* TO LEAVE ENGLISH = SPANISH IN TRAINEE SHIFT "c" & "d"*/
		d[i] = varA[i].replace(/\s<sup>.*<\/sup>/g,"") + " = " + varB[i].replace(/\s<sup>.*<\/sup>/g,"");
		c[i] = varB[i].replace(/\s<sup>.*<\/sup>/g,"") + " = " + varA[i].replace(/\s<sup>.*<\/sup>/g,"");
		e[i] = varA[i] + " = " + varB[i]; /* WE MADE THIS ARRAY TO SOLVE THE PROBLEM OF <sup>\d</sup>*/
		f[i] = varB[i] + " = " + varA[i]; /* WE MADE THIS ARRAY TO SOLVE THE PROBLEM OF <sup>\d</sup>*/
	}
	if(c[arrayPos+1] == undefined){
		c.push(c[0]);
		c.push(c[1]);
	}
}

var xx1;
var xx2;
var xx3;
var xx5;
var xx6;
var inputFontColor=document.getElementsByClassName('random-buttons-answer');

function aleatoryAnswerInputs(){
    if(mainIndex<varB.length){
    	xx1=varB[mainIndex].split('');
    	xx2=varB[mainIndex].split('');
    	xx3='';
    	xx5='';
    	xx5=xx1.reverse().join('');
    	xx5=xx5.split('');

        /* JUST FOR MOBILE KEYBOARD */
        var textInput=document.getElementById('next-game2-input-text');

        if(isNaN(varB[mainIndex])){
          textInput.setAttribute('type','text');
        }else{
          textInput.setAttribute('type','number');
        }

        if(varB[mainIndex].length<3){
            start2();
        }

        start();

    	for(var i=0;i<xx1.length;i++){
            xx3+='<input type="button" class="random-buttons-answer" onclick="putLetterIntoInputText(this.value,this)" value="'+xx1[i]+'">';
        }
    	document.getElementById('random-answer-btn').innerHTML=xx3;
        modifyHeightDependingOnAnsLength();
    }
}

function start3(){
  function shuffle(d){
    var e=d.length,f,g;

    while(0!==e){
      g=Math.floor(Math.random()*e);
      e-=1;
      f=d[e];
      d[e]=d[g];
      d[g]=f;
    }
    return [d];
  }
  shuffle(xx6);
}

function start4(i,j){
  const index = xx6.indexOf(i);
  if(index > -1) {
    	xx6.splice(index,1);
  }
  start3();
  if(j===undefined){
    xx6=xx6.slice(0,2);
  }else{
  	xx6=xx6.slice(0,1);
  }
  start5(i,j);
}

function start5(i,j){
  if(j===undefined){
      xx6.push(i);
  }else{
  	  xx6.push(i);
      xx6.push(j);
  }
  start3();
  xx1=xx6;
}

function start2(){
  if(xx1.length>1){
    if((isNaN(xx1[0]))||(isNaN(xx1[1]))){
      xx6=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
      start4(xx1[0],xx1[1]);
    }else{
      xx6=[0,1,2,3,4,5,6,7,8,9];
      start4(parseInt(xx1[0]),parseInt(xx1[1]));
    }
  }else{
    if(isNaN(xx1[0])){
      xx6=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
      start4(xx1[0]);
    }else{
      if(xx1[0]<5){
        xx6=[0,1,2,3,4,5,6];
      }else{
        xx6=[3,4,5,6,7,8,9];
      }
      start4(parseInt(xx1[0]));
    }
  }
}

function modifyHeightDependingOnAnsLength(){
    var el_1=document.getElementById('next-game2-dv1');
    var el_2=document.getElementById('dv1');
    var el_3=document.getElementsByClassName('next-game2-dv3')[0];
    if(placeHolderInfo_bool){
        if(screenWidth<1020){
        	if(varB[mainIndex].length>10){
        	    el_1.style.minHeight='259px';
        	    el_1.style.maxHeight='255px';
        	    el_2.style.minHeight='380px';
        	    el_2.style.maxHeight='380px';
        	    el_3.style.height='185px';
        	}else if(varB[mainIndex].length>5){
        	    el_1.style.minHeight='219px';
        	    el_1.style.maxHeight='215px';
        	    el_2.style.minHeight='340px';
        	    el_2.style.maxHeight='340px';
        	    el_3.style.height='140px';
        	}else{
        	    el_1.style.minHeight='179px';
        	    el_1.style.maxHeight='175px';
        	    el_2.style.minHeight='300px';
        	    el_2.style.maxHeight='300px';
        	    el_3.style.height='100px';
        	}
        }else{
        	if(varB[mainIndex].length>10){
        	    el_1.style.minHeight='329px';
        	    el_1.style.maxHeight='324px';
        	    el_2.style.minHeight='337px';
        	    el_2.style.maxHeight='462px';
        	    el_3.style.height='197px';
        	}else if(varB[mainIndex].length>5){
                el_1.style.minHeight='284px';
                el_1.style.maxHeight='279px';
                el_2.style.minHeight='292px';
                el_2.style.maxHeight='417px';
                el_3.style.height='152px';
        	}else{
                el_1.style.minHeight='254px';
                el_1.style.maxHeight='249px';
                el_2.style.minHeight='262px';
                el_2.style.maxHeight='387px';
                el_3.style.height='122px';
        	}
        }
    }else{
        defaultHeightQuizGame();
    }
}

function deleteLastCharOnKeyboardMode(a){
    var inputValue;
    if(placeHolderInfo_bool){
        if(a.length>0){
            inputValue=a.slice(0,-1);
            document.getElementById('next-game2-input-text').value=inputValue;
        }
    }
}

function blurInputWhenKeyboardOn(){
    if(placeHolderInfo_bool){
        userInputText.blur();
    }
}

function start(){
  function shuffle(d){
    var e=d.length,f,g;

    while(0!==e){
      g=Math.floor(Math.random()*e);
      e-=1;
      f=d[e];
      d[e]=d[g];
      d[g]=f;
    }
    /* TRANSFORM ARRAY INTO STRING WITHOUT COMMAS */
    var xx5s=xx5.join('');
    var xx1s=xx1.join('');
    var xx2s=xx2.join('');

    if((varB[mainIndex].length===3)&&((xx2[0]==xx2[1])||(xx2[0]==xx2[2])||(xx2[1]==xx2[0])||(xx2[1]==xx2[2]))){
        if((xx2s==xx1s)||(xx5s==xx1s)){
          start();
        }else{
            return [d];
        }
    }else{
        if((xx2[0]==xx1[0])||(xx5s==xx1s)){
          start();
        }else{
            return [d];
        }
    }
  }
  shuffle(xx1);
}

function putLetterIntoInputText(a,b){
    var xx4=userInputText.value;
    userInputText.value=xx4+a;
    b.blur();
}

var errorA3 = [];
var errorB3 = [];
var tempA3 = [];
var tempB3 = [];
var firstRowWrongAns = true;
var playAgainWrongAns = false;
var studyBlinkGame3 = 0;
var firstAnsTrue=true;
var errorCounter = 0;
var firstFocusGame3 = false;
var varRandom = "";
var varRandomIncorrect = "";
var localStorageValue="";
var varErrors="";
var categoryName = vtexto;
categoryName=categoryName+"_en_sp";
var varErrorsBool=true;
var pressTwiceVerifyButtonNextGameCorrect=true;
var userWrongAnswer=false;
var gameLength;
var numOfLettersAns;
var errorTimer;
var userMistake=false;
var userGoBackQuestionKeep=false;
var errorCounterTwo=0;
var gameFinished=false;
var stringWithAsterisks;

function nextGame3verify(){

    if(isNextButtonOn){
        return;
    }

    userInputText.placeholder='';
    document.getElementById('special-chars-keyboard').innerHTML="";

    if(masterTwelveJS){
        gameLength=(varB.length/2)-1;
    }else{
        gameLength=varB.length-1;
    }

	firstRowWrongAns=true;
	keyDownInput=true;

	screenWidth=window.innerWidth;

	screenHeight=window.innerHeight;

	var verifyInput=userInputText.value;

	ans=varB[mainIndex].replace(/\s<sup>.*<\/sup>/gi,"");
	ans=ans.toLowerCase();
	// 22.09.2022 //
	ans=ans.replace(/<sup>.*?<\/sup>/gi,'');
	ans=ans.replace(/\s\s+/g,' ');
	ans=ans.trim();

    var getFirstCharOfEachWord;
    var getFirstCharOfEachWord2;
    var firstChar;

    if((varB_aux[mainIndex].match(/<sup>C<\/sup>/gi))||(varB_aux[mainIndex].match(/<sup>street<\/sup>/gi))){
        varB[mainIndex]=varB[mainIndex].replace(/\s?<sup>.*<\/sup>/gi,'');
        /*NFD - REMOVING ACCENTUATION*/
        getFirstCharOfEachWord=varB[mainIndex].normalize('NFD').replace(/[\u0300-\u036f]/g,"");
        getFirstCharOfEachWord=getFirstCharOfEachWord.replace(/(\s?.)([a-z]+\s?)/gi,'$1');
        getFirstCharOfEachWord=getFirstCharOfEachWord.replace(/\s+/g,'').toLowerCase();

        varA[mainIndex]=varA[mainIndex].replace(/\s?<sup>.*<\/sup>/gi,'');
        /*NFD - REMOVING ACCENTUATION*/
        getFirstCharOfEachWord2=varA[mainIndex].normalize('NFD').replace(/[\u0300-\u036f]/g,"");
        getFirstCharOfEachWord2=getFirstCharOfEachWord2.replace(/(\s?.)([a-z]+\s?)/gi,'$1');
        getFirstCharOfEachWord2=getFirstCharOfEachWord2.replace(/\s+/g,'').toLowerCase();

        getFirstCharOfEachWord2=getFirstCharOfEachWord2+getFirstCharOfEachWord;
        firstChar=true;
    }else{
        getFirstCharOfEachWord=ans;
        firstChar=false;
    }

	verifyInput=verifyInput.toLowerCase();

	verifyInput=verifyInput.trim();

	yyy="";

	if((verifyInput == ans)||(verifyInput == getFirstCharOfEachWord)||(verifyInput == getFirstCharOfEachWord2)){
		if((firstAnsTrue)&&(!playAgainWrongAns)&&(!userClickHintButton)){
            if(!userCheat){
                if((verifyInput == getFirstCharOfEachWord)&&(firstChar)){
                    pontuation+=0.5;
                }else{
                    pontuation+=1;
                }
            }
            if(mainIndex<varA.length){
                varRandom += varIndex[mainIndex] + ",";
            }
		}

        document.getElementById("verify").style.pointerEvents="none";
        document.getElementById('training-mode-btn').style.pointerEvents="none";
        dv2.style.pointerEvents="none";

        pressTwiceVerifyButtonNextGameCorrect=false;

        blinkStudyFirstIteration=false;

        varErrorsBool=true;

		userInputText.focus();

		firstAnsTrue=true;

		if(mainIndex >= gameLength){
            gameFinish();
		}

        updateScore();

		userInputText.value="";

		mainIndex++;

        if(screenWidth<1020){
            document.getElementById("dv2").style.backgroundColor="lightgreen";
        }else{
            document.getElementById("dv2").style.backgroundColor="#99FFA0";
        }

        if(englishQuizMode){
            document.getElementById("dv2").style.color="darkblue";
        }

		setTimeout(function(){
            fontSize();
            dv2_backgroundColor();
            aleatoryAnswerInputs();
            document.getElementById("dv2").style.backgroundColor="white";

            // 30.04.2023 //
            if(varA_rW2[mainIndex].match(/^\d+$/)){
              stringWithAsterisks="";
              for(let i=0;i<varB_rW2[mainIndex].length;i++){
                if(varB_rW2[mainIndex].charAt(i).match(/[\s]/)){
                  stringWithAsterisks+=" ";
                }else if(varB_rW2[mainIndex].charAt(i).match(/[a-z0-9]/i)){
                  stringWithAsterisks+="*";
                }else{
                  stringWithAsterisks+=varB_rW2[mainIndex].charAt(i);
                }
              }
              document.getElementById("dv2").innerHTML="<span style='font-size:17px'>"+varA[mainIndex]+". </span><span id='dv2-transparent-text' style='font-size:17px;font-family:consolas;line-height:20px' onclick='dv2_transparent(this)' class='center-text-vertically'>"+stringWithAsterisks+"</span>";
              if(!dv2_transpBool){
                document.getElementById("dv2-transparent-text").style.color="transparent";
              }
            }else{
              document.getElementById("dv2").innerHTML="<span class='center-text-vertically'>"+varA[mainIndex]+"</span>";
            }
            // 30.04.2023 //

            //document.getElementById("dv2").innerHTML="<span class='center-text-vertically'>"+varA[mainIndex]+"</span>";

            /*22.09.2022*/
            if(varA[mainIndex].match(/<sup>/gi)){
                document.getElementsByClassName('center-text-vertically')[0].style.paddingTop='10px';
            }
            document.getElementById("verify").style.pointerEvents="auto";
            document.getElementById('training-mode-btn').style.pointerEvents="auto";
            dv2.style.pointerEvents="auto";
            pressTwiceVerifyButtonNextGameCorrect=true;
        	inputTextPlaceholder();
        	keyboardSpecialChars();
		},500);

		/**/
		if(firstRowWrongAns){
			tempA3.push(varA[mainIndex]);
			tempB3.push(varB[mainIndex]);
		}
		/**/
	}else{
		if(firstAnsTrue){
			errorCounter++;
		}

        pressTwiceVerifyButtonNextGameCorrect=false;

        userMistake=true;
        errorCounterTwo--;

        updateScore();

        userAskForFastAnswerIndex=mainIndex;

		varRandomIncorrect = varIndex[mainIndex] + ",";

		varRandom = varRandom.replace(varRandomIncorrect,'');

        if((mainIndex<varA.length)&&(varErrorsBool)){
    		varErrors += varIndex[mainIndex] + ",";
    		varErrors=varErrors.split(",");

    		// REMOVING DUPLICATES //
    		varErrors = varErrors.filter( function( item, index, inputArray ){
    			return inputArray.indexOf(item) == index;
    		});
    		// REMOVING DUPLICATES //
    		varErrors=varErrors.toString();
            if(localStorage.getItem(categoryName)){
                if((arrayLengthCategoryName.length-1) < (gameWordsQty-8)){
    		        sessionStorage.setItem(categoryName,varErrors);
                }
            }else{
                sessionStorage.setItem(categoryName,varErrors);
            }
    		varErrorsBool=false;
        }

        // 30.04.2023 //
        if(!varA_rW2[mainIndex].match(/^\d+$/)){
		  document.getElementById("dv2").style.backgroundColor="red";
		  document.getElementById("dv2").style.color="white";
		  document.getElementById("dv2").style.fontWeight="bold";
        }

		//document.getElementById("dv2").style.backgroundColor="red";
		//document.getElementById("dv2").style.color="white";
		//document.getElementById("dv2").style.fontWeight="bold";
		if(!studyModeBoolean){
		    document.getElementById("verify").style.pointerEvents="none";
		    document.getElementById('training-mode-btn').style.pointerEvents="none";
		    dv2.style.pointerEvents="none";
		}

		userWrongAnswer=true;
		fontSize();

		if(screenWidth < 1020){
		    if(!studyModeBoolean){
			    userInputText.style.outline="2px solid red";
		    }
			document.getElementById("dv2").style.lineHeight="58px";
		}

        if(!englishQuizMode){
            document.getElementById("dv2").style.fontSize=Math.floor(fontSizeVar*0.85)+"px";
        }

        // 30.04.2023 //
        if(!varA_rW2[mainIndex].match(/^\d+$/)){
		  document.getElementById("dv2").innerHTML="<span class='center-text-vertically'>"+varB[mainIndex].replace(/<sup>.*?<\/sup>/gi,"")+"</span>";
        }

		//document.getElementById("dv2").innerHTML="<span class='center-text-vertically'>"+varB[mainIndex].replace(/<sup>.*?<\/sup>/gi,"")+"</span>";

        numOfLettersAns=varB[mainIndex].replace(/\s<sup>.*?<\/sup>/gi,"").length;

        var studyModeTime=0;

        if(studyModeBoolean){
            if(studySpeed=='fast'){
                milliSeconds=92;
            }else if(studySpeed=='medium'){
                milliSeconds=184;
                studyModeTime=750;
            }else if(studySpeed=='slow'){
                milliSeconds=276;
                studyModeTime=1500;
            }else{
                milliSeconds=92;
            }
        }else{
            milliSeconds=92;
        }

        if(numOfLettersAns>3){
          errorTimer=700+((numOfLettersAns-3)*milliSeconds)+studyModeTime;
        }else{
          errorTimer=700+studyModeTime;
        }

        // 30.04.2023 //
        if(varA_rW2[mainIndex].match(/^\d+$/)){
          errorTimer=10;
          alert(varB_rW2[mainIndex]);
        }
        // 30.04.2023 //

		setTimeout(function(){
    		if(mainIndex > gameLength){
                gameFinish();
    		}else{
    		    //pressTwiceVerifyButtonNextGameCorrect=true;
    			afterWrongAnswerQuiz();
            }
            pressTwiceVerifyButtonNextGameCorrect=true;
		},errorTimer);

		userInputText.value=yyy;

		mainIndex++;

		/**/
		if(firstRowWrongAns){
			errorA3.push(varA[mainIndex]);
			errorB3.push(varB[mainIndex]);
		}
		/**/
	}
	var quizImg=document.getElementById("quiz-img");
	if(quizImg){
	    document.getElementById("quiz-img").style.display='none';
	}
	userClickHintButton=false;
	userClickHintButtonQty=0;
	userCheat=false;
	if(!userGoBackQuestionKeep){
	    userGoBackQuestion=false;
	}else{
	    userGoBackQuestionKeep=false;
	}
}

var dv2_transpBool=true;

function dv2_transparent(a){
  if(a=="keyboard"){
    var a=document.getElementById("dv2-transparent-text");
  }
  if(dv2_transpBool){
    a.style.color="transparent";
    dv2_transpBool=false;
  }else{
    a.style.color="inherit";
    dv2_transpBool=true;
  }
  document.getElementById("next-game2-input-text").focus();
}

function afterWrongAnswerQuiz(){
  document.getElementById("dv2").style.backgroundColor="white";

  dv2_backgroundColor();

  document.getElementById("dv2").style.fontWeight="normal";
  if(!studyModeBoolean){
    document.getElementById("verify").style.pointerEvents="auto";
    document.getElementById('training-mode-btn').style.pointerEvents="auto";
    dv2.style.pointerEvents="auto";
  }
  userInputText.disabled=false;

  if(screenWidth < 1020){
    userInputText.style.outline="2px solid lightgreen";
  }else{
    userInputText.style.outline="3px solid lightgreen";
  }
  fontSize();
  aleatoryAnswerInputs();
  inputTextPlaceholder();

  // 30.04.2023 //
  if(varA_rW2[mainIndex].match(/^\d+$/)){
    stringWithAsterisks="";
    for(let i=0;i<varB_rW2[mainIndex].length;i++){
      if(varB_rW2[mainIndex].charAt(i).match(/[\s]/)){
        stringWithAsterisks+=" ";
      }else if(varB_rW2[mainIndex].charAt(i).match(/[a-z0-9]/i)){
        stringWithAsterisks+="*";
      }else{
        stringWithAsterisks+=varB_rW2[mainIndex].charAt(i);
      }
    }
    document.getElementById("dv2").innerHTML="<span style='font-size:17px'>"+varA[mainIndex]+". </span><span id='dv2-transparent-text' style='font-size:17px;font-family:consolas;line-height:20px' onclick='dv2_transparent(this)' class='center-text-vertically'>"+stringWithAsterisks+"</span>";
    if(!dv2_transpBool){
      document.getElementById("dv2-transparent-text").style.color="transparent";
    }
  }else{
    document.getElementById("dv2").innerHTML="<span class='center-text-vertically'>"+varA[mainIndex]+"</span>";
  }
  // 30.04.2023 //

  //document.getElementById("dv2").innerHTML="<span class='center-text-vertically'>"+varA[mainIndex]+"</span>";

  if(varA[mainIndex].match(/<sup>/gi)){
    document.getElementsByClassName('center-text-vertically')[0].style.paddingTop='10px';
  }
  keyboardSpecialChars();
}

function gameFinish(){
    if((randomActived)&&(!playAgain2)){

		if(localStorage.getItem(categoryName)){
			var sessionSanitize = localStorage.getItem(categoryName);
			sessionSanitize=sessionSanitize.replace(/&|<|"|\'/g,'');
			varRandom+=sessionSanitize;

			varRandom=varRandom.split(",");

			// REMOVING DUPLICATES //
			varRandom = varRandom.filter( function( item, index, inputArray ){
				return inputArray.indexOf(item) == index;
			});
			// REMOVING DUPLICATES //

            var minLastGameWord=gameWordsQty-1;
            var maxLastGameWord=gameWordsQty+7;
            var varRandomLengthSt=varRandom.length-1;

            while((varRandomLengthSt > minLastGameWord) && (varRandomLengthSt < maxLastGameWord-1)){
                varRandom.pop();
                varRandomLengthSt--;
            }

			varRandom=varRandom.toString();
		}

		localStorage.setItem(categoryName,varRandom);
	}

	mainIndex -= 1;

	setTimeout(function(){
	    document.getElementById('play_again_button').style.pointerEvents='auto';
		document.getElementById("dv1").style.display="none";
		if(screenWidth<750){
		    document.getElementById("menu-right").style.display="none";
		}
		document.getElementById("finish-div").style.display="block";
		document.getElementById("next-game2-dv1").style.display="none";
		document.getElementById("final-pontuation").innerHTML=pontuation+"/"+realArrayLength;
		document.getElementById("final-time").innerHTML=sec-1;
		allowAllGamesButtonOnFinalDiv();
    	if((randomActived)&&(!playAgain2)){
    		localStorageValue="&randomString=,"+localStorage.getItem(categoryName);
		    btnClickModifyOnclick();
    	}
		if(customActived){
		    // BE CAREFUL BEFORE DELETING THE LINE BELOW //
            //btnClickModifyOnclick2();
    	}else if(randomActived){
    	    btnClickModifyOnclick3();
    	}
		clearInterval(timer);
        if(studyModeBoolean){
        	studyModeFalse(2);
        }
        // SAVING GAME IN LAST GAMES MENU //
        savingGameInLastGamesMenu();
        // ALL ANSWERS CORRECT SAVE GAME ID IN DB //
        if(pontuation==realArrayLength){
          if(getIdParam==='i'){
            gameIdToDB(getCatParam+getGameNumber,'quiz');
          }
        }
		return;
	}, 250);
}

var allGamesBtnFinishDivMobile=document.getElementById('all-games-btn-finish-div-mobile');

function allowAllGamesButtonOnFinalDiv(){
  if(window.innerWidth<750){
    allLevelsOpen=false;
    allGamesBtnFinishDivMobile.style.display='block';
  }else{
    allGamesBtnFinishDivMobile.style.display='none';
  }
}

function inputTextPlaceholder(){
    if((dontShowPlaceholder==0)||(dontShowPlaceholder==null)){
    	if(varB[mainIndex].length>1){
    	    userInputText.placeholder=varB[mainIndex].length+' letters ...';
    	}else{
    	    userInputText.placeholder=varB[mainIndex].length+' letter ...';
    	}
    }else{
        userInputText.placeholder='';
    }
}

var arrayPos = 0;
var c = [];
var c_aux = [];
var d = [];
var e = [];
var f = [];
var m;

var imgCorrect;
var imgCorrect2;
var imgCorrect3;

var traineeGameRunning=false;
var nextGameRunning=false;

function traineeGame(){
    traineeGameRunning=true;
    nextGameRunning=false;

	keyDownInput=true;

    document.getElementById("finish-div").style.display="none";
    document.getElementsByClassName("hide-button")[0].style.display="none";

	clearInterval(timer);

	sec=0;

	arrayPos=0;

	zeroIndex=0;

	acertos=0;

	traineeAnsError=0;

	traineeVerifyLetter=true;

	document.getElementById("home-link").style.display="none";

    document.getElementById('training-mode-btn').setAttribute('onclick','makeNextButtonFalse();nextGame3();');
    document.getElementById('training-mode-btn').value='Return Quiz <';

	document.getElementById("see-list").style.display="block";

	document.getElementById("next-button").setAttribute("class","verify-next next_button_blink");

	forLoopForArraysDCEF();

	traineeGame2();
}

var mobileFirstClickInAllGames=false;
var userInputText=document.getElementById("next-game2-input-text");
var nextButtonPress;

function traineeGame2(){
	isTraineeOn=false;
    isNextButtonOn=true;
	backToGameOne=false;

	document.getElementById("trainee-game").innerHTML="";

	document.getElementById("verify").style.display="none";
	document.getElementById("next-button").style.display="inline";

	document.getElementById("dv2").style.backgroundColor="white";
	document.getElementById("dv2").style.fontWeight="normal";
	document.getElementById("return-link2").style.pointerEvents="auto";

    userInputText.style.caretColor="transparent";
    userInputText.style.backgroundColor="#eee";
    userInputText.placeholder="";
    userInputText.style.color="transparent";

	m = arrayPos;

	screenWidth=window.innerWidth;
	screenHeight=window.innerHeight;

    if(screenWidth<699){
        mobileFirstClickInAllGames=true;
    }

	/*22.09.2022*/
	c[m]=c[m].replace(/<sup>.*?<\/sup>/gi,'');
	c[m]=c[m].replace(/\s\s+/g,' ');
	c[m]=c[m].trim();

	stringLengthWithoutSup=c[m].length;

	document.getElementById("pontuation").style.display="none";
	document.getElementById("time").style.display="none";
	userInputText.value="";
	document.getElementById("next-game2-dv1").style.display="block";

	fontSize();
	document.getElementById("dv2").innerHTML="<span class='center-text-vertically'>"+c[m]+"</span>";
    localStorage.training_mode=1;
    makeInputTextTransparent();

    if(!nextButtonPress){
        document.getElementById('next-button').focus();
        setTimeout(()=>{
            document.getElementById('next-button').blur();
        },50);
    }
}

function makeNextButtonFalse(){
    isNextButtonOn=false;
}

var zeroIndex = 0;

var restartRound = true;

var traineeDifLevel = 1;

var traineeDifThree=true;

var removeBlinkVerify=false;

var stringLengthWithoutSup;

function makeInputTextTransparent(){
    userInputText.style.backgroundColor='transparent';
    userInputText.style.outline='transparent';
    userInputText.style.border='none';
    userInputText.style.caretColor="transparent";
    userInputText.placeholder="";
    userInputText.style.color="transparent";
    borderTopWidth(0);
}

function makeInputTextVisible(){
    userInputText.style.backgroundColor='white';
    userInputText.style.outline='lightgreen solid 3px';
    userInputText.style.border='1px solid green';
    userInputText.placeholder="...your answer...";
    userInputText.style.caretColor="auto";
    userInputText.style.color="black";
    borderTopWidth(0);
}

function borderTopWidth(a){
    if(a===0){
        if(window.innerWidth<1020){
            document.getElementById('dv5').style.borderTop='1px solid grey';
        }else{
            document.getElementById('dv5').style.borderTop='2px solid grey';
        }
    }else if(a===1){
        if(window.innerWidth<1020){
            document.getElementById('dv5').style.borderTop='none';
        }else{
            document.getElementById('dv5').style.borderTop='2px solid grey';
        }
    }
}

function nextButtonTrainee(){
    nextButtonPress=true;
    makeInputTextVisible();

    m++;

    if(typeof(c[m]) != 'undefined'){
        stringLengthWithoutSup=c[m].length;
    }

	yyy="";

	q = 0;

	userInputText.value="";

	if(m == arrayPos+temp+1){

		if(screenWidth>=1020){
			document.getElementById("dv2").style.fontSize="36px";
			document.getElementById("dv2").style.lineHeight="85px";
		}else{
            document.getElementById("dv2").style.fontSize="24px";
            document.getElementById("dv2").style.lineHeight="60px";
		}
        document.getElementById("dv2").style.padding="10px";

        /* THIS CODE IS JUST FOR PLAY SQL KEYWORDS */
        if((varA[m]=="")||(varB[m]=="")){
			document.getElementById("dv2").innerHTML = "___ &nbsp;= &nbsp;___</div>";
        }else{
            /* TO LEAVE ENGLISH = SPANISH IN TRAINEE SHIFT "a" & "b"*/
    		if(invertValues){
    			document.getElementById("dv2").innerHTML="<span class='center-text-vertically'>"+varA[m-1].charAt(0) + "___ &nbsp;&nbsp;&nbsp; " + varB[m-1].charAt(0) + "___</span>";
    		}else{
    			document.getElementById("dv2").innerHTML="<span class='center-text-vertically'>"+varB[m-1].charAt(0) + "___ &nbsp;&nbsp;&nbsp; " + varA[m-1].charAt(0) + "___</span>";
    		}
        }

		userInputText.style.visibility="visible";
		if(screenWidth <= 736){
			setTimeout(function(){
				/**/
			}, 633);
		}else{
			setTimeout(function(){
				/**/
			}, 0);
		}
		userInputText.value="";
		document.getElementById("verify").setAttribute("onclick","traineeGameVerify()");
		document.getElementById("verify").style.display="inline";
		document.getElementById("next-button").style.display="none";
		document.getElementById("see-answer").style.display="none";

        userInputText.focus();

		if(!removeBlinkVerify){
			removeBlinkVerify=true;
		}else{
			document.getElementById("verify").setAttribute("class","verify-vf");
		}
		setTimeout(function(){
			isTraineeOn=true;
		},0);
	}else{
	    fontSize();
	    document.getElementById("dv2").innerHTML="<span class='center-text-vertically'>"+c[m]+"</span>";
	}
}

var seilaoque = false;
var acertos=0;
var correctAnsTrainee=0;
var traineeAnsError=0;
var firstTraineeRepeat=true;
var fixingProblemSup2traineeRepeat = false;
var invertValues;
var verifyButtonEnable=true;

function traineeGameVerify(a=0){

	document.getElementById("verify").style.pointerEvents="auto";
	document.getElementById("return-link2").style.pointerEvents="none";

	var verifyInput=userInputText.value;

	verifyInput=verifyInput.toLowerCase();

	verifyInput=verifyInput.trim();

	m=arrayPos;

	ans=c[m].replace(" = "," ");
	ans=ans.toLowerCase();
	/*22.09.2022*/
	ans=ans.replace(/<sup>.*?<\/sup>/gi,'');
	ans=ans.replace(/\s\s+/g,' ');
	ans=ans.trim();
	verifyInput = verifyInput.replace(" = "," ");
	verifyInput = verifyInput.replace("="," ");

	stringLengthWithoutSup=c[m];

	var verifySupInString=stringLengthWithoutSup.includes("</sup>");

	if(verifySupInString){
		stringLengthWithoutSup=stringLengthWithoutSup.length-14;
	}else{
		stringLengthWithoutSup=stringLengthWithoutSup.length;
	}

	if(screenWidth>=1020){
		if(stringLengthWithoutSup > 30){
			document.getElementById("dv2").style.fontSize="23px";
		}else if(stringLengthWithoutSup > 20){
			document.getElementById("dv2").style.fontSize="31px";
		}else{
			document.getElementById("dv2").style.fontSize="35px";
		}
	}else{
		if(stringLengthWithoutSup > 30){
			document.getElementById("dv2").style.fontSize="15px";
		}else if(stringLengthWithoutSup > 20){
			document.getElementById("dv2").style.fontSize="20px";
		}else{
			document.getElementById("dv2").style.fontSize="23px";
		}
	}

    if(a==1){
        if(verifyInput !== ans){
            return;
        }
    }

	if(verifyInput !== ans){
		correctAnsTrainee=0;
		if(seeAnswerButton){
			alert("\n\n" + c[m]);
		}else{
			document.getElementById("dv2").style.backgroundColor="red";
			document.getElementById("dv2").style.color="white";
			document.getElementById("dv2").style.fontWeight="bold";
            fontSize();
            document.getElementById("dv2").style.fontSize=Math.floor(fontSizeVar*0.88)+"px";
			document.getElementById("see-answer").style.display="none";
			document.getElementById("verify").disabled = true;
			document.getElementById("verify").setAttribute("class","verify-vf");
			userInputText.focus();
			document.getElementById("dv2").innerHTML="<span class='center-text-vertically'>"+c[m].replace(" = ","&nbsp;&nbsp;")+"</span>";
			isTraineeOn=false;
			traineeAnsError++;
			setTimeout(function(){
				document.getElementById("dv2").style.backgroundColor="white";
                dv2_backgroundColor();
				document.getElementById("dv2").style.fontWeight="normal";
				document.getElementById("verify").setAttribute("class","verify-vf next_button_blink");
			}, 1250);
			setTimeout(function(){
				document.getElementById("verify").disabled=false;
				document.getElementById("return-link2").style.pointerEvents="auto";
			}, 1300);
		}
		setTimeout(function(){
			seeAnswerButton=false;
			m = arrayPos;
			if(seilaoque){
				arrayPos=arrayPos-acertos;
				zeroIndex=zeroIndex-acertos;
				acertos=0;
			}
			seilaoque = false;
			yyy="";
			q = 0;
			isNextButtonOn=true;
			document.getElementById("trainee-game").innerHTML="";
			document.getElementById("see-answer").style.display="none";
			traineeDifThree=true;
			verifyEqualBoolean=true;
			traineeGame2();
		}, 1250);
	}else{
	    makeInputTextTransparent();

		if(screenWidth>=1200){
            /* THE CODE BELOW IS GIVING ME PROBLEMS IN SERVER THAT'S WHY I'M USING URI */
            //document.getElementById("dv2").innerHTML="<img id='correct-image-green' src='../images/correct1.gif'>";
			document.getElementById("dv2").innerHTML="<img id='correct-image-green' src='data:image/gif;base64,R0lGODlhNgJhAOYAAACAAILBgjOZM/n8+dTq1LncuRyOHGKxYp3One/371WqVcjkyA2GDXG4cfX13I3GjUejR/b79uLx4sLhwkCgQGi0aJnMmSqVKqbTptHo0f///3i8eJTKlN7v3iaTJoXChW63bs3mzfL58qHQoTicOKnUqdrt2lisWO327f///73evcXjxff794jEiFqtWmWyZdPp0/v9+6fTp9vt20mkSfP582q1aoPBg8vly+v16+Px46PRo8/nz7vdu4fDh0KhQnK5cp/PnwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAHAP8ALAAAAAA2AmEAAAf/gACCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2tvc3d7f4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/v8AAwocSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48gQ4ocSbKkyZMoU6pcybKly5cwY8qcSbOmzV0CGgTZCYTBzZ9ACRnYkUCD0aMcgiq1ScPE0acJXiydGvNChqdPd1Dd6nIH1qMZLnAdm7JC0a8JDpBdW/ICga9G/5OynRsSQQy4OHzS3cvxBAq4KE7wHZyRwQq4GuQSXkzRxwC4GTwwnhyRRAe4aSlrdugVrtbNoBP6hWtCbOjTBVXAZREAtWuBIGrAVaH3te19hgELvs0734YInnsLt8eAB9wOJIYrl7eBxdcYD5ZLd1ccLgzJ07Ona/41wgbt4M0xwAF3Re3w6L/ZkI21Boj08L9NmB2/vjIKFhbw2JFckYuzUEll34DDQBDCXUfpQIMiJdBH4IO/nJADXAoiQsOEWEUF4Ya8BPAYZKYVYgFcE3BoYi5WIaZBD+cB4IFT7dlw4oy20KCDiiMUwh1W5tHo4yw2IpZABYTMhxUL3/2oJMssZiEmwQ+CKPAXVtctaaUrNwAHF4sAjIhVDC1cKSYrHzj31QA+vPiVBP2N6eYpBSCWwwNaPoXBm3iakiJcdR6VgAt5BjpKkCo+VaKgiIISgJmFIpnoo540WKgGM2AH6aWYXACjindi6uklsan456ekViIpXDy0WOqqjFgGF3SsxvrIomtCKeutiwCxgA4i5JABf7gGK+ywxBZr7LHIJqvsssw26+yz0EYr7bTUVmvttdhmq+223Hbr7bfghivuuOSWa+656Kar7iyBAAA7'/>";
		}else if(screenWidth>=1020){
            /* THE CODE BELOW IS GIVING ME PROBLEMS IN SERVER THAT'S WHY I'M USING URI */
            //document.getElementById("dv2").innerHTML="<img id='correct-image-green' src='../images/correct2.gif'>";
            document.getElementById("dv2").innerHTML="<img id='correct-image-green' src='data:image/gif;base64,R0lGODlhmgFhAOYAAACAAACPh/fjh1+AAHfj9x/Lz9/XRwCAP///zKfv/6+rAJfTtx+AAB+rj9fjp5+fAP/3v9f7/1/b5/f//4evLwCAdwC3v8/HH4+PAG/P15/r9+/fby+jdz+AAP/vpwCvtwCAH8f7////58fr1wCfn0fHx+/////7zx+3v6+zH+fbX5fn7z/P17+3AL/3/6fTn/frnwCPV///90fT32ePALfr72/f76+jAACPl9//////3y+zl//zt//71//nlx/DxwCPb4fj99fr1////8/7//fjd0eAAACfp7evAKefAP//76fTpwCARwCPj5ePAMe7AP//16/v///vr//rn+f///X13ACjn2+PANf//8z//5+jAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAHAP8ALAAAAACaAWEAAAf/gACCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2tvc3d7f4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/v8AAwocSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48gQ4ocSbKkyZMoU6pcybKly48cFowQ4oDGy5uzYqwYwnOICAU4g7oCEaQnzw0MhCpV9WOCUR4Dlko1FSCEUR03pmoVBcKG0SEGtor9ZMGEUSlGxqrVxCSKURFI/9bKvcTi64a5eCdVNQrhSt6/jyQYlXEBsOFFJLAYndLhsONDXnvCfUx5UGKjApJWphyZJ5QHmynjyGJURWjKgnuewHBabIMaTnWkMFTBak/TrbUeyWG0h5ZCBYyuzq21CZGvfQcdSFCa+FYrEb7CSAvgA5WeCJw434rCrNGwAAgYLbJdbAnvPJW0GN0Ta3mxM5BnMOpD8/upTDR8HfzkvlggLuzHE1T+idWdgLgVuFVn7SWh4H8BGuVBYw9yhx5hFY61wxJLvEBBhiCGKOKIJJZo4okopqjiiiy26OKLMMYo44w01mjjjTjmqOOOPPbo449ABinkkEQWaeSRSCap5AmSTDbp5JMzBgIAOw=='/>";
		}else{
            /* THE CODE BELOW IS GIVING ME PROBLEMS IN SERVER THAT'S WHY I'M USING URI */
            //document.getElementById("dv2").innerHTML="<img id='correct-image-green' src='../images/correct3.gif'>";
            document.getElementById("dv2").innerHTML="<img id='correct-image-green' src='data:image/gif;base64,R0lGODlhKAFJANUAAACAAHi8ePf79zicOM3mzanUqSaTJmOxY+327ZTKlFGoUd7v3rvduw2GDf///0mkSW63boXChaLRorTatNrt2sLhwrLZslisWPH48eXy5YDAgJnMmWi0aHO5c0CgQIjEiPn8+SqVKtHo0cXjxZ/Pn7ncuePx4/X69fX13MjkyKTSpO/373a7do3Gjf///1qtWmWyZdPp073evdvt2/v9++Hx4aPRo2q1aofDh8/nz/P58wAAAAAAAAAAAAAAAAAAACH5BAAHAP8ALAAAAAAoAUkAAAb/QIBwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLV+LzYEIjIetr5zAykOww4nHb/Ibg0jxMMMDcnRai00zQsD0tlmCgjNJxDa4WINMs0OBeLpXxoCzRQh6vFaIRTNAgHy+Vck5iX6/1O4NcvwAKDBJxbMJTjIcAmMFc1iGGhI8Ug5YvcqahzysNkIaBs1Xhy2AkZIjS8gErNwUmNCYggutEx3IEa1FSyMPMjQjOXMoHAcMDRbwaHIhmYxf4a70K2ZiYJCDNQjNkGpOA4qiYmAByBAO5IvrIqL8JUYOgAVmlUQmy5BWQcCNKQk9o1tOhXmTBRolgOkXW0hRJirNozGh7/pHpgwR6wGNsRj31KFrK4EYx03KCde7G6iZnE4QDRb+DkdBAkSSJgszbq169ewY8ueTbu27du4c+vezbu379/AgwsfTry48ePIkyuXFgQAOw=='/>";
		}

		verifyEqualBoolean=true;
		verifyButtonEnable = false;
		document.getElementById("verify").style.pointerEvents="none";
		userInputText.placeholder="";
		var varLength;
		if((customActived)&&(!customStringBool)){
		    varLength = c.length/2;
		}else{
		    varLength = c.length/2;
		}
        document.getElementById("dv2").style.padding="0";
        mainIndex++;
		if(arrayPos == varLength-1){
			if(firstTraineeRepeat){
				setTimeout(function(){
					acertos=0;
					arrayPos=0;
					zeroIndex=0;
					isNextButtonOn=true;
					firstTraineeRepeat=false;
					verifyButtonEnable=true;
                    document.getElementById("dv2").style.padding="10px";
					document.getElementById("see-answer").style.display="none";
					document.getElementById("verify").style.pointerEvents="auto";
				    c_aux=c;
					c = d;
					d = c_aux;
					invertValues=true;
					fixingProblemSup2traineeRepeat = true;
					mainIndex=0;
					traineeGame2();
				},600);
			}else{
				setTimeout(function(){
    				document.getElementById("verify").style.pointerEvents="auto";
    				verifyButtonEnable=true;
    				firstFocusGame3=false;
    				isNextButtonOn=false;
    				nextGame3();
    				return;
				},600);
			}
		}else{
			userInputText.value="";

			setTimeout(function(){
			    verifyButtonEnable = true;
				document.getElementById("dv2").innerHTML="";
                document.getElementById("dv2").style.padding="10px";
				document.getElementById("verify").style.pointerEvents="auto";
				m++;
				acertos++;
				arrayPos = m;
				zeroIndex++;
				restartRound=false;
				seilaoque = true;
				yyy="";
				q = 0;

				if(screenWidth>=1020){
					document.getElementById("dv2").style.fontSize="36px";
                    document.getElementById("dv2").style.lineHeight="85px";/*80*/
				}else{
				    document.getElementById("dv2").style.fontSize="24px";
				    document.getElementById("dv2").style.lineHeight="60px";
				}
				document.getElementById("dv2").style.padding="10px";

                /* THIS CODE IS JUST FOR PLAY SQL KEYWORDS */
                if((varA[m]=="")||(varB[m]=="")){
        			document.getElementById("dv2").innerHTML = "___ &nbsp;= &nbsp;___</div>";
                }else{
                    /* TO LEAVE ENGLISH = SPANISH IN TRAINEE SHIFT "A" & "B" */
    				if(invertValues){
    					document.getElementById("dv2").innerHTML="<span class='center-text-vertically'>"+varA[m].charAt(0) + "___ = &nbsp;&nbsp;" + varB[m].charAt(0) + "___</span>";
    				}else{
    					document.getElementById("dv2").innerHTML="<span class='center-text-vertically'>"+varB[m].charAt(0) + "___ = &nbsp;&nbsp;" + varA[m].charAt(0) + "___</span>";
    				}
                }

				if(zeroIndex == temp+1){
					zeroIndex=0;
					arrayPos = m;
					seilaoque = false;
					isNextButtonOn=true;
					document.getElementById("see-answer").style.display="none";

					var stringLengthWithoutSup=c[m];

					var verifySupInString=stringLengthWithoutSup.includes("</sup>");

					if(verifySupInString){
						stringLengthWithoutSup=stringLengthWithoutSup.length-14;
					}else{
						stringLengthWithoutSup=stringLengthWithoutSup.length;
					}

					if(screenWidth>=1020){
						if(stringLengthWithoutSup > 30){
							document.getElementById("dv2").style.fontSize="23px";
						}else if(stringLengthWithoutSup > 20){
							document.getElementById("dv2").style.fontSize="31px";
						}else{
							document.getElementById("dv2").style.fontSize="35px";
						}
					}else{
						if(stringLengthWithoutSup > 30){
							document.getElementById("dv2").style.fontSize="15px";
						}else if(stringLengthWithoutSup > 20){
							document.getElementById("dv2").style.fontSize="20px";
						}else{
							document.getElementById("dv2").style.fontSize="23px";
						}
					}

					traineeDifThree=true;
					acertos=0;
					traineeGame2();
				}
			},600);
		}
	}
	correctAnsTrainee++;
	userInputText.focus();
}

function dv2_backgroundColor(){
    if(englishQuizMode){
        if(screenWidth<1020){
            document.getElementById("dv2").style.color="black";
        }else{
            document.getElementById("dv2").style.color="darkblue";
        }
    }else{
        document.getElementById("dv2").style.color="green";
    }
}

var seeAnswerButton=false;

function seeAnswer(){
	if(backToGameOne){
		nextGame3verify();
	}else{
		traineeGameVerify();
	}
}

var yyy="";

var q = 0;

var equalSpace;

function letterKeyboard(hello,heyyy){

	c[arrayPos] = c[arrayPos].replace(" = "," ");

	if(hello == " = "){
		equalSpace = true;
		hello=" ";
	}

	if(traineeVerifyLetter){
		if(hello == c[arrayPos].charAt(q)){
			document.getElementById(heyyy).style.outline="2px solid lightgreen";
			setTimeout(function(){
				document.getElementById(heyyy).style.outline="none";
			}, 150);
			q++;
		}else{
			document.getElementById(heyyy).style.outline="2px solid red";
			setTimeout(function(){
				document.getElementById(heyyy).style.outline="none";
			}, 150);
			q++;
		}
	}

	if(equalSpace){
		hello=" = ";
		equalSpace=false;
	}

	yyy+=hello;
	userInputText.value = yyy;
}

function clearValue(){
	yyy="";
	q = 0;
	userInputText.value = yyy;
}

function backSpace(){
	var stringToRemoveLastChar = userInputText.value;
	var newStr = stringToRemoveLastChar.slice(0,-1);

	yyy=newStr;

	q--;

	userInputText.value=yyy;
}

function difficultyLevel(level){
	temp = level;
	if(level==0){
		traineeDifLevel=0;
	}else{
		traineeDifLevel=1;
	}
	for(var i=0;i<3;i++){
		document.getElementById("dl"+i).style.outline="none";
	}
	document.getElementById("dl"+level).style.outline="2px solid rgba(255,0,0,0.6)";
}

function playAgain(){

	playAgainWrongAns=false;
	
	sec=0;
	
	document.getElementById('timer2').innerHTML=sec;

	document.getElementById("finish-div").style.display="none";

	document.getElementById("study").style.display="block";

	mainIndex = 0;
	pontuation = 0;

	timerFunc();

	nextGame3();
	return;
}

function repeatErrors(){
	if((errorCounter < 8)&&(errorCounter > 0)){
		errorsRepeating = "Erros: " + errorCounter + " + " + (8 - errorCounter);
	}else{
		errorsRepeating = "Erros: " + errorCounter;
	}

	document.getElementById("study-text").style.color="green";

	varA = errorA3;
	varB = errorB3;

	playAgainWrongAns=true;

	clearInterval(timer);

	errorCounter=0;
	mainIndex = 0;
	pontuation = 0;

	document.getElementById("erros").setAttribute("class","blink_errors");

	setTimeout(function(){
		/**/
	}, 1250);

	setTimeout(function(){
		document.getElementById("erros").removeAttribute("class");
	}, 2000);

	firstStage=false;

	document.getElementById("finish-div").style.display="none";

	nextGame3();
}

function sortList() {
  var list, i, switching, b, shouldSwitch;
  list = document.getElementById("study-info");
  switching = true;
  while (switching) {
	switching = false;
	b = list.getElementsByTagName("LI");
	for (i = 0; i < (b.length - 1); i++) {
	  shouldSwitch = false;
	  if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
		shouldSwitch = true;
		break;
	  }
	}
	if (shouldSwitch) {
	  b[i].parentNode.insertBefore(b[i + 1], b[i]);
	  switching = true;
	}
  }
}

document.onkeyup = function (e){
    if(game4_newStudyGameBool){
		e = e || window.event;
		if(e.keyCode === 13){
			game4_VerifyButtonFunc();
			return false;
		}
    }
	if((isThirdGameOn)&&(pressTwiceVerifyButtonNextGameCorrect)&&(!isNextButtonOn)){
		e = e || window.event;
		if(e.keyCode === 13){
			nextGame3verify();
			return false;
		}
	}
	if((isTraineeOn)&&(verifyButtonEnable)){
		e = e || window.event;
		if (e.keyCode === 13){
			traineeGameVerify();
			return false;
		}
	}
	if(isNextButtonOn){
		e = e || window.event;
		if (e.keyCode === 13){
			nextButtonTrainee();
			return false;
		}
	}
};

var allLevelsOpen=true;
var rankingOpen=true;
var canOpen=true;
var sssssssss=true;
var y;
var categoryBlink;
var classNamePrepare;
var classNamePrepare2;
var classNamePrepare3;
var classNamePrepare4;
var seilaslals=true;
var seilaslals2=false;
var seilaslals3=true;
var seilaslals4=true;
var seilaslals5=true;
var allGamesTrueFalse=true;
var openMenuAfterClose;
var screenWidth2=window.innerWidth;

if(screenWidth2 < 699){
	openMenuAfterClose=false;
}else{
	openMenuAfterClose=true;
}

var menuRightOpen=false;
var touchGameOpen=true;

function allLevelsResp(){
    /* 28.01.2023 */
    menuRight.style.visibility='visible';
    if(studyModeBoolean){
        studyModeFalse(1);
    }

	if(screenWidth>=800){
        /**/
	}else{
	    clearInterval(x);
	    userInputText.blur();
	}

    seilaslals5=false;
	setTimeout(function(){
	    seilaslals5=true;
	},300);
	rankingOpen=false;

	if(screenWidth>698){
	    liFirstGoTop=false;
	}else if(seilaslals3){
	    liFirstGoTop=true;
	    seilaslals3=false;
	}else{
	    liFirstGoTop=false;
	}
	seilaslals=false;

	if(document.querySelectorAll("a[class^='"+classNamePrepare3+"']")){
    	setTimeout(function(){
    		/**/
    	},100);
	}

	document.getElementById("all-levels2").style.display="block";
	document.getElementById("all-levels2-p").style.display="block";
	document.getElementById("menu-right").style.display="block";
	menuRightOpen=true;

	if((allLevelsOpen)&&(canOpen)&&(openMenuAfterClose)){
		canOpen=false;
        if(window.innerWidth>=750){
		  document.getElementById("all-levels2-p").setAttribute("class","first-p menu_right_blink6");
		  document.getElementById("return-to-game-resp").setAttribute("class","last-p menu_right_blink6");
        }
		setTimeout(function(){
			document.getElementById("all-levels2-p").setAttribute("class","first-p");
			document.getElementById("return-to-game-resp").setAttribute("class","last-p");
			canOpen=true;
		},1200);
	}else{
		allLevelsOpen=true;
		openMenuAfterClose=true;
	}
	setTimeout(function(){
		/**/
	},100);
}

function rankingResp(){
	allLevelsOpen=true;
	document.getElementById("all-levels2").style.display="none";
	document.getElementById("all-levels2-p").style.display="none";
	document.getElementById("ranking2").style.display="block";
	document.getElementById("ranking2-p").style.display="block";
	document.getElementById("menu-right").style.display="block";

	if((rankingOpen)&&(canOpen)){
		canOpen=false;
		document.getElementById("ranking2-p").setAttribute("class","first-p menu_right_blink");
		document.getElementById("return-to-game-resp").setAttribute("class","last-p menu_right_blink");
		setTimeout(function(){
			document.getElementById("ranking2-p").setAttribute("class","first-p");
			document.getElementById("return-to-game-resp").setAttribute("class","last-p");
			canOpen=true;
		},1200);
	}else{
		rankingOpen=true;
	}
}

function returnToGameResp(){
	document.getElementById("menu-right").style.display="none";
	menuRightOpen=false;
	closeDivStudyBool=false;
	clickOutsideMenuRight=false;

	if(screenWidth<800){
	    clearInterval(x);
	}
    setTimeout(() => {
	    userInputText.focus();
    },250);
	openMenuAfterClose=false;
}

function traineeGamePlayAgain(){
	document.getElementById("return-link").style.display="block";
	document.getElementById("return-link2").style.display="block";
	document.getElementById("finish-div-tg").style.display="none";
	arrayPos=0;
	zeroIndex=0;
	traineeGame();
}

var verifyEqualBoolean=true;

function verifyEqualinInput(){
	var inputEqualVerify=userInputText.value;
	var verifyEqual=inputEqualVerify.includes("=");
	if((verifyEqual)&&(verifyEqualBoolean)){
		verifyEqualBoolean=false;
		setTimeout(function(){
			document.getElementById("equalNotNeeded").style.display="inline-block";
		},100);
		setTimeout(function(){
			document.getElementById("equalNotNeeded").style.display="none";
		},3500);
	}
}

function openList(w,y){
    y = y.replace(/^0/g,"");

    categoryBlink = document.getElementById(y);
    seilaslals5=true;
	classNamePrepare = w.replace(/^all-levels\s|-list$/g,"");

	classNamePrepare2 = classNamePrepare + "-list";
	classNamePrepare3 = w.replace(/^(all-levels\s)(.*)$/g,'$1$2 menu_right_blink');
	classNamePrepare4 = w.replace(/^(all-levels\s)(.*)$/g,'$1$2');
	classNamePrepare5 = w.replace(/^(all-levels\s)(.*)$/g,'$1$2 not_menu_right_blink');

    if((w.search("all-levels")>=0)&&(sssssssss)&&(seilaslals)&&(seilaslals2)){
		setTimeout(function(){
	        if(typeof categoryBlink.children[1]!=="undefined"){
	            categoryBlink.children[1].setAttribute("class","all-levels "+classNamePrepare2+" menu_right_blink");
	        }
		},1000);
		sssssssss=false;
    }else{
        setTimeout(function(){
	        document.getElementById("see-list").setAttribute("class","menu_right_blink");
		},400);
    }

	var getClassNameType = document.getElementsByClassName(classNamePrepare);

	var notInClass = "li:not([class*="+classNamePrepare+"]).all-levels-sub-cat";

	var displayNoneLiIfNotClicked = document.querySelectorAll(notInClass);

    if((getClassNameType[0].style.display != 'block')&&(seilaslals)){
        /* AQUI ELE ABRE OS ELEMENTOS A DO LI PAI */
    	for(var i=0;i<getClassNameType.length;i++){
    		getClassNameType[i].style.display="block";
    	}
    	allGamesClickGoTopFalse=false;
    	seilaslals2=true;
    	seilaslals4=false;
    }else{
		if((!sssssssss)&&(seilaslals)){
			sssssssss=true;
			if(document.querySelectorAll("a[class^='"+classNamePrepare3+"-list']").menu_right_blink){
			    document.querySelectorAll("a[class^='"+classNamePrepare3+"']")[0].setAttribute("class",classNamePrepare4);
			}else{
			    document.querySelectorAll("a[class*='"+classNamePrepare2+"']")[0].setAttribute("class",classNamePrepare4);
			}
    		/* AQUI ELE FECHA OS ELEMENTOS A DO LI PAI */
        	for(var i=0;i<getClassNameType.length;i++){
        		getClassNameType[i].style.display="none";
        	}
        	allGamesClickGoTopFalse=true;
        	seilaslals4=true;
        }
    }
    /* HERE WE CLOSE ALL LIS THAT HAVEN'T BEEN CLICKED */
    allGamesClickGoTopFalse=true;
}

function closeList(){
	/**/
}

function playAgainFunc(){
	playAgain2 = true;
	nextGame3();
}

function redArrowBlink(){
	/**/
}

function redArrowBlink2(){
	setTimeout(function(){
		document.getElementById("arrow-blink").setAttribute("class","arrow-size menu_right_blink5");
	},1800);
	setTimeout(function(){
		document.getElementById("arrow-blink").setAttribute("class","arrow-size");
	},5800);
}

function onKeyDownInput(){
  keyDownInput=true;
}

var varA_Length;
var varB_Length;
var fontSizeGameLength;
var fontSizeVar;

var studyHereDiv;
var e_StudyDiv=false;
var f_StudyDiv=false;
var prepareTableTxt='';

function openDivStudy(){
    document.getElementById("dv1").style.display="none";
    document.getElementById("menu-right").style.display="none";
    document.getElementById("next-game2-dv1").style.display="none";

    e_StudyDiv=true;
    f_StudyDiv=false;

    studyHereDiv=document.getElementsByClassName("study-here-div")[0];

    studyHereDiv.style.display="block";

    prepareTableTxt="<input class='study-here-div-button study-here-button-top' type='button' onclick='closeDivStudy();' value='Close X'><table>";

    for(var i=0;i<varA.length;i++){
      prepareTableTxt+="<tr class='study-here-div-td-class'><td>"+varB[i]+"</td><td>"+((typeof(varB[++i])==='undefined') ? '' : varB[i])+"</td><td>"+((typeof(varB[++i])==='undefined') ? '' : varB[i])+"</td></tr>";
    }
    studyHereDiv.innerHTML=prepareTableTxt+"</table><input class='study-here-div-button' type='button' onclick='closeDivStudy();' value='Close X'><div class='div-study-textarea'><input style='width:100%;padding:8px;' type='text' placeholder='practice here...'></div>";
}

var trainingIndex;

function openDivStudy2(){
    document.getElementById("dv1").style.display="none";
    document.getElementById("menu-right").style.display="none";
    document.getElementById("next-game2-dv1").style.display="none";

    e_StudyDiv=true;
    f_StudyDiv=false;

    studyHereDiv=document.getElementsByClassName("study-here-div")[0];

    studyHereDiv.style.display="block";
    studyHereDiv.setAttribute('class','study-here-div different-selection-color');

    mainIndex=0;
    trainingIndex=0;

    prepareTableTxt="<input class='study-here-div-button study-here-button-top' type='button' onclick='closeDivStudy();' value='X'><div class='swipe-next-back-dv'><div class='swipe-back'></div><div class='swipe-next' onclick='trainingModeClick(1,null)'></div></div><span class='training-mode-span'>"+varA[mainIndex]+"</span><div class='training-mode-footer'><input class='training-next-btn training-restart-btn' type='button' value='BACK'><input class='training-next-btn' onclick='trainingMode()' type='button' value='NEXT'></div>";

    studyHereDiv.innerHTML=prepareTableTxt;
}

function trainingMode(a=0){
  event.stopPropagation();
  if(mainIndex>=varB.length){
    studyHereDiv.innerHTML="";
    setTimeout(() => {
      studyHereDiv.innerHTML="<input class='training-mode-back-to-game-btn' type='button' onclick='closeDivStudy()' value='Go to Quiz!'>";
      studyHereDiv.innerHTML+="<input class='training-mode-play-again-btn' type='button' onclick='openDivStudy2()' value='Play Again!'>";
    },700);
    return;
  }
  ++trainingIndex;
  if(trainingIndex%2===0){
    if(mainIndex<0){
        openDivStudy2();
        return;
    }else{
        prepareTableTxt="<input class='study-here-div-button study-here-button-top' type='button' onclick='closeDivStudy();' value='X'><div class='swipe-next-back-dv'><div class='swipe-back' onclick='trainingModeClick(0,0)'></div><div class='swipe-next' onclick='trainingModeClick(1,null)'></div></div><span class='training-mode-span'>"+varA[mainIndex]+"</span><div class='training-mode-footer'><input class='training-next-btn training-restart-btn' onclick='trainingModeBackBtn(0)' type='button' value='BACK'><input class='training-next-btn' onclick='trainingMode()' type='button' value='NEXT'></div>";
    }
  }else{
    if(a===1){
        trainingMode();
        return;
    }else{
        prepareTableTxt="<input class='study-here-div-button study-here-button-top' type='button' onclick='closeDivStudy();' value='X'><div class='swipe-next-back-dv'><div class='swipe-back' onclick='trainingModeClick(0,1)'></div><div class='swipe-next' onclick='trainingModeClick(1,null)'></div></div><span class='training-mode-span'>"+varB[mainIndex]+"</span><div class='training-mode-footer'><input class='training-next-btn training-restart-btn' onclick='trainingModeBackBtn(1)' type='button' value='BACK'><input class='training-next-btn' onclick='trainingMode()' type='button' value='NEXT'></div>";
        mainIndex++;
    }
  }
  studyHereDiv.innerHTML=prepareTableTxt;
}

function trainingModeClick(a,b){
  if(a===0){
    if(b===0){
      trainingModeBackBtn(0);
    }else if(b===1){
      trainingModeBackBtn(1);
    }
  }else if(a===1){
    trainingMode();
  }
}

function trainingModeBackBtn(a){
  if(trainingIndex<=1){
    openDivStudy2();
  }else{
    if(a===0){
      trainingIndex-=2;
      mainIndex--;
    }else if(a===1){
      trainingIndex-=2;
      if(trainingIndex%2===0){
        mainIndex-=2;
      }else{
        mainIndex--;
      }
    }
    trainingMode(1);
  }
}

var firstIterationDotDotDot=true;

function clearTextarea(t,v,a){
    if(v.includes('  ')){
        t.value='';
    }else if(v.includes('...')){
        prepareTableTxt='';

        for(var i=0;i<varA.length;i++){
          prepareTableTxt+="<span>"+varB[i]+"</span> | ";
        }
        studyHereDiv.innerHTML="<br><br><br><br>"+prepareTableTxt+"<input class='study-here-div-button' type='button' onclick='closeDivStudy();' value='Close X'><div class='div-study-textarea'><textarea rows='4' onkeyup='clearTextarea(this,this.value,true)' placeholder='practice here...' autofocus></textarea></div>";
    }
    if(a){
        v=v.toLowerCase();
        if(firstIterationDotDotDot){
            prepareTableTxt=prepareTableTxt.replace(/(<span>)|(<\/span>)/gi,'');
            prepareTableTxt=prepareTableTxt.replace(/[^a-z]/gi,'');
            prepareTableTxt=prepareTableTxt+prepareTableTxt;
            firstIterationDotDotDot=false;
        }
        if(v.includes('  ')){
          studyHereDiv.style.backgroundColor='lightgreen';
        }else if(v.includes(' ')){
          studyHereDiv.style.backgroundColor='lightgreen';
        }else if(prepareTableTxt.includes(v)){
          studyHereDiv.style.backgroundColor='lightgreen';
        }else{
          studyHereDiv.style.backgroundColor='red';
        }
    }
}

/* DONT REMOVE THE CODE BELOW */
/* THIS CODE WILL BE NECESSARY WHEN A USER CLICK OUTSIDE THE MENU-RIGHT */
/* WE WILL NEED THIS CODE TO CLOSE THE MENU-RIGHT */

/*window.addEventListener('click',function(event){
  if(e_StudyDiv){
    if(!studyHereDiv.contains(event.target)){
      if(f_StudyDiv){
        //e_StudyDiv=false;
        closeDivStudy();
      }else{
        studyHereDiv.style.display="block";
        f_StudyDiv=true;
      }
    }
  }
});*/

var menuRight=document.getElementsByClassName('menu')[0];
var closeDivStudyBool;

function closeDivStudy(a=0){
  if((a===2)&&(varB_rW2[0]=="#")){
    varA_rW=[];
    varB_rW=[];
    varA=[...varA_rW2];
    varB=[...varB_rW2];
    randomWords_ForLoop();
    //hmIncreasingArray=true;
    onlyForRandomWordsGameHashtagAnswers=true;
  }

  if((a===2)&&((varB_rW2[0]=="#")||(varB_rW2[0].match(/^\d+$/)))){
    hmIncreasingArray=true;
  }

  screenWidth=window.innerWidth;
  e_StudyDiv=false;
  mainIndex=0;
  closeDivStudyBool=true;
  game4_newStudyGameBool=false;

  setTimeout(function(){
    touchGameDiv.style.display="none";
    touchGameFinishDiv.style.display="none";
    nsgMainDiv.style.display="none";
    nsgFinalDiv.style.display="none";
    nsg2_FinalDiv.style.display="none";
    game4_studyModeChooseGame.style.display='none';
    game4_MainDiv.style.display='none';
    game4_FinalDiv.style.display='none';
    game5_studyModeChooseGame.style.display='none';
    game5_MainDiv.style.display='none';
    game5_FinalDiv.style.display='none';
    nsg2_MainDiv.style.display='none';
    if(a===1){
      hmMainOne.style.display="none";
      menuRight.style.outline='2px solid green';
    }else{
      hmMainOne.style.display="block";
      menuRight.style.outline='1px solid black';
    }
  },75);
  setTimeout(function(){
    if(a===1){
      document.getElementById("dv1").style.display="block";
    }
    if((screenWidth>698)&&(a===0)){
      document.getElementById("menu-right").style.display="block";
    }
    if(a===1){
      document.getElementById("next-game2-dv1").style.display="block";
      playAgainNextGame3Shuffle();
    }else{
      hmPlayAgainBtn();
    }
  },250);
  gotoLiGameWhenClick();
}

function gotoLiGameWhenClick(){
  goToLiGame(goToLiThisId,goToLiUrlPath);
  if(closeDivStudyBool){
    liFirstGoTop=true;
  }
  setTimeout(()=>{
    goToLiGameWhenRefresh();
  },250);
}

function playAgainNextGame3Shuffle(){
    clearInterval(timer);
    if(varB_rW2[0]=="#"){
      varA_rW=[];
      varB_rW=[];
      varA=varA_rW2;
      varB=varB_rW2;
      randomWords_ForLoop();
    }
    if(gameUrlNumber<100){
      shuffelArray();
    }
	nextGame3();
}

function shuffelArray(){
  function shuffle(a,b){
    var x=a.length,t1,r1;
    var y=b.length,t2,r2;

    while(0!==x){

      r1=r2=Math.floor(Math.random()*x);
      x=y-=1;

      t1=a[x];
      t2=b[y];

      a[x]=a[r1];
      b[y]=b[r2];

      a[r1]=t1;
      b[r2]=t2;
    }
    return [a,b];
  }
  shuffle(varA,varB);
}

function timerFunc(){
	timer=setInterval(function(){
		sec++;
		document.getElementById('timer2').innerHTML=sec;
		if(sec > 9999){
			clearInterval(timer);
		}
	}, 1000);
}

var hintButtonElement=document.getElementsByClassName("hint-button")[0];

var userClickHintButton=false;
var userClickHintButtonQty=0;
var dv2=document.getElementById('dv2');

function hintButton(){
  userClickHintButton=true;

  userClickHintButtonQty++;

  if((pontuation>-99)&&(userClickHintButtonQty<=varB[mainIndex].length)){
    pontuation--;
    updateScore();
  }

  var userInput=document.getElementById("next-game2-input-text");
  var userInputValue=userInput.value;

  var firstLetterUpperCase=false;
  var firstLetter=userInputValue.charAt(0)

  if(firstLetter == firstLetter.toUpperCase()){
    firstLetterUpperCase=true;
  }

  userInputValue=userInputValue.toLowerCase();

  varB[mainIndex]=varB[mainIndex].replace(/\s?<sup>.*?<\/sup>/gi,'');

  if(userInputValue.length==0){
    userInput.value=varB[mainIndex].charAt(0);
  }else{
    for(var i=0;i<userInputValue.length;i++){
      if(userInputValue.charAt(i).toLowerCase()==varB[mainIndex].charAt(i).toLowerCase()){
        if(firstLetterUpperCase){
          userInput.value=firstLetter+varB[mainIndex].slice(1,i+2);
        }else{
          userInput.value=varB[mainIndex].slice(0,i+2).toLowerCase();
        }
      }else{
        if(firstLetterUpperCase){
          userInput.value=varB[mainIndex].charAt(0).toUpperCase()+varB[mainIndex].slice(1,i+1);
        }else{
          userInput.value=varB[mainIndex].slice(0,i+1).toLowerCase();
        }
        userInput.focus();
        return;
      }
    }
  }
  userInput.focus();
}

var redBlinkAfterHintTimer;

function redBlinkAfterHint(){
    var scoreText=document.getElementById('pontuation2');
    clearTimeout(redBlinkAfterHintTimer);
    scoreText.style.color='red';

    redBlinkAfterHintTimer=setTimeout(() => {
        scoreText.style.color='black';
    },500);
}

function updateScore(){
  if(!playAgainWrongAns){
    //if((pontuation < 10)&&(pontuation > 0)&&(varA.length >= 10)){
    let scoreToString=pontuation.toString();
    if((pontuation < 10)&&(pontuation > 0)&&(varA.length >= 10)&&(!scoreToString.match(/\./g))){
      document.getElementById("pontuation2").innerHTML = "0" + pontuation + "/" + realArrayLength;
    }else{
      document.getElementById("pontuation2").innerHTML = pontuation + "/" + realArrayLength;
    }
  }
}

function focusInputText(){
    if(studyModeBoolean){
        userInputText.blur();
    }else{
        userInputText.focus();
    }
}

var placeHolderInfo_bool;

//06.05.2022

/*if(!localStorage.hide_button){
    localStorage.hide_button=1;
    placeHolderInfo_bool=false;
    hideButton(1);
}else if(localStorage.hide_button==0){
    placeHolderInfo_bool=true;
    document.getElementsByClassName("hide-button")[0].value="Show";
    hideButton(1);
}else{
    localStorage.hide_button=1;
    placeHolderInfo_bool=false;
    hideButton(1);
}*/

function hideButton(a=0){
    var nextGameInput=document.getElementById("next-game2-input-text");
    var nextGameInputValue=userInputText.value;
    if(placeHolderInfo_bool){
        placeHolderInfo_bool=false;
        nextGameInput.placeholder="";
        document.getElementsByClassName("hide-button")[0].value="Show";
        if(studyModeBoolean){
            nextGameInput.blur();
        }else{
            if((menuRightCantFocus)&&(a!==2)){
                nextGameInput.blur();
            }else{
                if(nextGameInputValue==""){
                    nextGameInput.focus();
                }else{
                    nextGameInput.value="";
                    nextGameInput.value=nextGameInputValue;
                    nextGameInput.focus();
                }
            }
        }
        if(a!==3){
            localStorage.hide_button=0;
        }
        defaultHeightQuizGame();
        placeHolderInfoFunc();
    }else{
        placeHolderInfo_bool=true;
        document.getElementsByClassName("hide-button")[0].value="Hide";
        if(a!==3){
            localStorage.hide_button=1;
        }
        modifyHeightDependingOnAnsLength();
        placeHolderInfoFunc();
    }
    if(a===0){
        /**/
    }
}

function defaultHeightQuizGame(){
    var el_1=document.getElementById('next-game2-dv1');
    var el_2=document.getElementById('dv1');
    var el_3=document.getElementsByClassName('next-game2-dv3')[0];

    if(window.innerWidth<1020){
        el_1.style.minHeight='179px';
        el_1.style.maxHeight='175px';
        el_2.style.minHeight='298px';
        el_2.style.maxHeight='298px';
        el_3.style.height='100px';
    }else{
        el_1.style.minHeight='254px';
        el_1.style.maxHeight='249px';
        el_2.style.minHeight='262px';
        el_2.style.maxHeight='387px';
        el_3.style.height='122px';
    }
}

function placeHolderInfoFunc(){
    if(placeHolderInfo_bool){
        document.getElementById("random-answer-btn").style.display='block';
    }else{
        document.getElementById("random-answer-btn").style.display='none';
    }
}

var lettersLanguage="";

if(window.location.href.indexOf("/qz/english-spanish/") > -1){
  lettersLanguage=" letras";
}else if(window.location.href.indexOf("/qz/english-portuguese/") > -1){
  lettersLanguage=" letras";
}else if(window.location.href.indexOf("/qz/english-italian/") > -1){
  lettersLanguage=" lettere";
}else if(window.location.href.indexOf("/qz/english-catalan/") > -1){
  lettersLanguage=" lletres";
}else if(window.location.href.indexOf("/qz/english-french/") > -1){
  lettersLanguage=" lettres";
}else{
  lettersLanguage=" letters";
}

function fontSize(){
    if((!englishQuizMode)&&(!userWrongAnswer)){
        var stringLengthWithoutSup=varA[mainIndex];
        var verifySupInString=stringLengthWithoutSup.includes("</sup>");

        if(verifySupInString){
            document.getElementById("dv2").style.paddingTop="13px";
        }else{
            document.getElementById("dv2").style.padding="0px 10px";
        }
    }else{
        document.getElementById("dv2").style.padding="0px 10px";
    }

    if(!userWrongAnswer){
        varA_Length=varA[mainIndex].replace(/\s<sup>.*<\/sup>/gi,"");
        varB_Length=varB[mainIndex].replace(/\s<sup>.*<\/sup>/gi,"");
    }else{
        varA_Length=varB[mainIndex].replace(/\s<sup>.*<\/sup>/gi,"");
        varB_Length=varA[mainIndex].replace(/\s<sup>.*<\/sup>/gi,"");
    }

    varA_Length=varA_Length.length;
    varB_Length=varB_Length.length;

    varB_Length_2=varB[mainIndex].replace(/\s<sup>.*<\/sup>/g,"");
    varB_Length_2=varB_Length_2.length;

    if(varA[mainIndex].match(/<sup>/gi)){
      varA_Length+=2;
    }

    if(varB[mainIndex].match(/<sup>/gi)){
      varB_Length+=2;
    }

    if(traineeGameRunning){
      fontSizeGameLength=c[m].length+4;
    }else{
      fontSizeGameLength=varA_Length+2;
    }

    if(!traineeGameRunning){
        if(placeHolderInfo_bool){
            placeHolderInfoFunc();
        }else{
            if((!placeHolderInfo_bool)&&(!studyModeBoolean)&&(!menuRightOpen)){
                userInputText.focus();
            }
        }
    }else if(!userWrongAnswer){
        /**/
    }

    if((screenWidth>=1200)&&(screenHeight>=450)){
      document.getElementById("dv2").style.lineHeight="35px";
      if((!traineeGameRunning)&&(!englishQuizMode)&&(!userWrongAnswer)){
        document.getElementById("dv2").style.fontStyle="italic";
      }else{
        document.getElementById("dv2").style.fontStyle="normal";
      }
      if(fontSizeGameLength>75){
        document.getElementById("dv2").style.fontSize="19px";
        fontSizeVar=19;
      }else if(fontSizeGameLength>60){
        document.getElementById("dv2").style.fontSize="20px";
        fontSizeVar=20;
      }else if(fontSizeGameLength>50){
        document.getElementById("dv2").style.fontSize="23px";
        fontSizeVar=20;
      }else if(fontSizeGameLength>35){
        document.getElementById("dv2").style.fontSize="25px";
        fontSizeVar=22;
      }else if(fontSizeGameLength>25){
        document.getElementById("dv2").style.fontSize="29px";
        fontSizeVar=29;
      }else if(fontSizeGameLength>20){
        document.getElementById("dv2").style.fontSize="35px";
        fontSizeVar=35;
      }
      else if(fontSizeGameLength>10){
        document.getElementById("dv2").style.fontSize="40px";
        fontSizeVar=40;
      }
      else if(fontSizeGameLength>3){
        document.getElementById("dv2").style.fontSize="45px";
        fontSizeVar=45;
      }else if(fontSizeGameLength>0){
        document.getElementById("dv2").style.fontSize="50px";
        fontSizeVar=50;
      }else if((fontSizeGameLength-2)>15){
        document.getElementById("dv2").style.fontSize="40px";
        fontSizeVar=40;
      }else if((fontSizeGameLength-2)>10){
        document.getElementById("dv2").style.fontSize="45px";
        fontSizeVar=45;
      }else if((fontSizeGameLength-2)>9){
        document.getElementById("dv2").style.fontSize="47px";
        fontSizeVar=47;
      }else if((fontSizeGameLength-2)>8){
        document.getElementById("dv2").style.fontSize="49px";
        fontSizeVar=49;
      }else if((fontSizeGameLength-2)>7){
        document.getElementById("dv2").style.fontSize="50px";
        fontSizeVar=50;
      }else if((fontSizeGameLength-2)>5){
        document.getElementById("dv2").style.fontSize="53px";
        fontSizeVar=53;
      }else if((fontSizeGameLength-2)>4){
        document.getElementById("dv2").style.fontSize="56px";
        fontSizeVar=56;
      }else if((fontSizeGameLength-2)>2){
        document.getElementById("dv2").style.fontSize="58px";
        fontSizeVar=58;
      }
    }else if((screenWidth>=1020)&&(screenHeight>=450)){
      document.getElementById("dv2").style.lineHeight="35px";
      if(fontSizeGameLength>75){
        document.getElementById("dv2").style.fontSize="17px";
        fontSizeVar=17;
      }else if(fontSizeGameLength>60){
        document.getElementById("dv2").style.fontSize="20px";
        fontSizeVar=20;
      }else if(fontSizeGameLength>30){
        document.getElementById("dv2").style.fontSize="24px";
        fontSizeVar=24;
      }else if(fontSizeGameLength>25){
        document.getElementById("dv2").style.fontSize="25px";
        fontSizeVar=24;
      }else if(fontSizeGameLength>20){
        document.getElementById("dv2").style.fontSize="30px";
        fontSizeVar=30;
      }else if(englishQuizMode){
        document.getElementById("dv2").style.fontSize="39px";
        fontSizeVar=39;
      }else if((fontSizeGameLength-2)>15){
        document.getElementById("dv2").style.fontSize="37px";/*40*/
        fontSizeVar=37;
      }else if((fontSizeGameLength-2)>10){
        document.getElementById("dv2").style.fontSize="42px";/*45*/
        fontSizeVar=42;
      }else if((fontSizeGameLength-2)>9){
        document.getElementById("dv2").style.fontSize="43px";/*47*/
        fontSizeVar=43;
      }else if((fontSizeGameLength-2)>8){
        document.getElementById("dv2").style.fontSize="45px";/*49*/
        fontSizeVar=45;
      }else if((fontSizeGameLength-2)>7){
        document.getElementById("dv2").style.fontSize="46px";/*50*/
        fontSizeVar=46;
      }else if((fontSizeGameLength-2)>5){
        document.getElementById("dv2").style.fontSize="49px";/*53*/
        fontSizeVar=49;
      }else if((fontSizeGameLength-2)>4){
        document.getElementById("dv2").style.fontSize="52px";/*56*/
        fontSizeVar=52;
      }else if((fontSizeGameLength-2)>2){
        document.getElementById("dv2").style.fontSize="55px";/*58*/
        fontSizeVar=55;
      }
    }else{
      document.getElementById("dv2").style.lineHeight="25px";
      if(fontSizeGameLength>88){
        document.getElementById("dv2").style.fontSize="14px";
        fontSizeVar=14;
      }else if(fontSizeGameLength>80){
        document.getElementById("dv2").style.fontSize="14px";
        fontSizeVar=14;
      }else if(fontSizeGameLength>70){
        document.getElementById("dv2").style.fontSize="14px";
        fontSizeVar=14;
      }else if(fontSizeGameLength>60){
        document.getElementById("dv2").style.fontSize="15px";
        fontSizeVar=15;
      }else if(fontSizeGameLength>50){
        document.getElementById("dv2").style.fontSize="16px";
        fontSizeVar=16;
      }else if(fontSizeGameLength>35){
        document.getElementById("dv2").style.fontSize="17px";
        fontSizeVar=17;
      }else if(fontSizeGameLength>25){
        document.getElementById("dv2").style.fontSize="17px";
        fontSizeVar=17;
      }else if(fontSizeGameLength>20){
        document.getElementById("dv2").style.fontSize="21px";
        fontSizeVar=21;
      }else if(fontSizeGameLength>10){
        document.getElementById("dv2").style.fontSize="24px";
        fontSizeVar=24;
      }else if(fontSizeGameLength>6){
        document.getElementById("dv2").style.fontSize="28px";
        fontSizeVar=28;
      }else if(fontSizeGameLength>4){
        document.getElementById("dv2").style.fontSize="30px";
        fontSizeVar=30;
      }else{
        document.getElementById("dv2").style.fontSize="33px";
        fontSizeVar=33;
      }
    }
    userWrongAnswer=false;
}

var studyModeIndex=mainIndex;
var studyModeBoolean=false;
var border_dv2;
var element_dv2=document.getElementById('dv2');
var style;
var waitTimerToFinish=true;
var studyModeTimeout;
var studyModeInterval;
var placeHolderInfoAux;

function studyMode(){
    userInputText.blur();
    if(waitTimerToFinish){
        style=window.getComputedStyle(element_dv2);

        studyModeInterval=setInterval(() => {
          userInputText.blur();
        },10);

        if(!studyModeBoolean){
            waitTimerToFinish=false;
            studyModeTimeout=setTimeout(() => {

                openStudyModeDiv();

                waitTimerToFinish=true;
                clearInterval(studyModeInterval);
                if(placeHolderInfo_bool){
                    placeHolderInfoAux=1;
                }else{
                    placeHolderInfoAux=2;
                    placeHolderInfo_bool=true;
                }
            },600);
        }else{
            clearInterval(studyModeInterval);
            studyModeFalse(2);
        }
    }
}

function studyModeTrue(){
    studyModeBoolean=true;
    hideButton(3);
    document.getElementsByClassName('hide-button')[0].setAttribute('onclick','studyMode()');
    document.getElementById('random-answer-btn').style.visibility='hidden';
    document.getElementById("verify").style.pointerEvents='none';
    border_dv2=style.getPropertyValue('border');
    element_dv2.style.border='3px solid orange';
    document.getElementsByClassName("hide-button")[0].value="Stop*";
    userInputText.style.pointerEvents='none';
    studyModeFunc_1();
}

var menuRightCantFocus=false;

function studyModeFalse(a){
    userInputText.blur();
    clearTimeout(studyModeTimeout);

    setTimeout(() => {
        studyModeBoolean=false;

        if(decreaseTimeStudyModeCancel){
            document.getElementById('random-answer-btn').style.visibility='visible';
            decreaseTimeStudyModeCancel=false;
        }else{
            setTimeout(() => {
                document.getElementById('random-answer-btn').style.visibility='visible';
            },250);
        }

        element_dv2.style.border=border_dv2;
        document.getElementById("verify").style.pointerEvents='auto';
        userInputText.style.pointerEvents='auto';

        if(placeHolderInfoAux==1){
            placeHolderInfo_bool=false;
            document.getElementsByClassName('hide-button')[0].setAttribute('onclick','hideButton(2)');
        }else{
            placeHolderInfo_bool=true;
            document.getElementsByClassName('hide-button')[0].setAttribute('onclick','hideButton(2)');
            if(a===2){
                userInputText.focus();
                menuRightCantFocus=false;
            }else{
                userInputText.blur();
                menuRightCantFocus=true;
            }
        }
        hideButton(1);

        clearTimeout(timerStudy);
        waitTimerToFinish=true;
    },150);
}

var timerStudy;

var milliSeconds;

function studyModeFunc_1(){
    if(studySpeed=='fast'){
      milliSeconds=35;/*45*/
    }else if(studySpeed=='medium'){
      milliSeconds=55;/*75*/
    }else if(studySpeed=='slow'){
      milliSeconds=85;/*90*/
    }else{
      milliSeconds=35;/*45*/
    }
    if((studyModeIndex<varB.length)&&(studyModeBoolean)){
        var timerStudyMode=(varA[mainIndex].length*milliSeconds)+500;
        timerStudy=setTimeout(() => {
            studyModeFunc_2();
            studyModeIndex++;
        },timerStudyMode);
    }
}

function studyModeFunc_2(){
    nextGame3verify();
    setTimeout(() => {
        studyModeFunc_1();
    },errorTimer);
}

// PREVENT USER TO CLICK SEVERAL TIMES IN LOGIN LINK //
document.getElementsByClassName("account a-italic")[0].addEventListener(
  'click',
  () => {
    document.getElementsByClassName("account a-italic")[0].style.pointerEvents='none';
  }
);

var studySpeed;

function openStudyModeDiv(){
    document.getElementsByClassName("dv-study-mode")[0].style.display='block';
    document.getElementById("random-answer-btn").style.visibility='hidden';
    
    document.getElementById("dv1").style.visibility='hidden';
    document.getElementById("next-game2-dv1").style.visibility='hidden';
    document.getElementById("menu-right").style.visibility='hidden';
    userInputText.style.visibility='hidden';

    if((localStorage.study_speed)&&
        ((localStorage.study_speed=='fast')||
        (localStorage.study_speed=='medium')||
        (localStorage.study_speed=='slow')
      )){
      studySpeed=localStorage.study_speed;
      document.getElementById(studySpeed).checked=true;
    }else{
      studySpeed='fast';
      document.getElementById(studySpeed).checked=true;
    }
}

function studyModeOk(){
    studySpeed=document.querySelector('input[name="study-speed"]:checked').value;
    localStorage.study_speed=studySpeed;

    studyModeCloseDv();

    setTimeout(() => {
        studyModeTrue();
    },400);
}

var decreaseTimeStudyModeCancel=false;

function studyModeCancel(){
    studyModeCloseDv();

    setTimeout(() => {
        decreaseTimeStudyModeCancel=true;
        studyModeFalse(2);
    },400);
}

function studyModeCloseDv(){
    document.getElementsByClassName("dv-study-mode")[0].style.display='none';

    setTimeout(() => {
        document.getElementById("dv1").style.visibility='visible';
        document.getElementById("next-game2-dv1").style.visibility='visible';
        document.getElementById("menu-right").style.visibility='visible';
        userInputText.style.visibility='visible';
    },400);
}

/*function clickToStart(){
    document.getElementById("click-to-start").style.display="block";
}*/

/* TOUCH GAME */
var touchGameFinishDiv=document.getElementsByClassName("touch-game-finish-div")[0];
var buttonsAnswersClass=document.getElementsByClassName("dv-four-option-button");
var dvButtons=document.getElementsByClassName("dv-buttons-container")[0];
var touchGameDiv=document.getElementsByClassName("touch-game-div")[0];
var dvQuestionText=document.getElementsByClassName("dv-question")[0];
var buttonsAnsDefinitionFirstIteration=false;
var verifyWhatDivIdIsCorrectForOrangeBlink;
var answerTimer;
var becameWhiteOnlyInOrangeDivBlink=false;
var userCorrectAnswerConfirmation=false;
var userWrongAnswerConfirmation=false;
var splittingArrayWithQuestions;
var userClickedInWrongDiv=false;
var splittingArrayWithAnswers;
var firstClickNext=true;
var timeForUserToAnswer;
var timeToNextQuestion;
var redWrongDivId;
var touchGameIndex=0;
var typeOfTextInButtonsAnswers=0;
var dvQuestionTextIndex=1;
var playAgainIndex;
var touchTimeout1;
var touchTimeout2;
var touchTimeout3;
var touchGameArrayOne_1;
var touchGameArrayOne;
var touchGameArrayTwo_1;
var touchGameArrayTwo;
var numberOfGames;
var touchGameArrayLength;
var touchGameArrayOne_2;
var touchGameArrayTwo_2;
var touchGameArrayOne_3;
var touchGameArrayTwo_3;

function openDivStudy3(){
    game4_studyModeChooseGame.style.display='none';
    game5_studyModeChooseGame.style.display='none';
    game5_FinalDiv.style.display='none';
    touchGameArrayOne_1=[];

    // 30.04.2023 //
    if(varA_rW2[mainIndex].match(/^\d+$/)){
      varA=varB_rW2;
      varB=varA_rW2;
    }else{
      varA=varA_rW2;
      varB=varB_rW2;
    }

    if(varB_rW2[0]=="#"){
      varA_rW=[];
      varB_rW=[];
      randomWords_ForLoop();
    }

    for (var i=0;i<varA.length;i++){
      touchGameArrayOne_1[i]=[varB[i],varA[i]];
    }
    touchGameArrayOne=touchGameArrayOne_1;

    touchGameArrayTwo_1=[];

    for (let i=0;i<varA.length;i++){
      touchGameArrayTwo_1[i]=[varB[i],varA[i]];
    }
    touchGameArrayTwo=touchGameArrayTwo_1;

    numberOfGames=1;

    touchGameArrayLength=varA.length;

    if((touchGameArrayLength>10)&&(touchGameArrayLength<=20)){
      numberOfGames=2;
      sliceArrayIfBiggerThanTen(touchGameArrayLength);
    }else if((touchGameArrayLength>20)&&(touchGameArrayLength<=30)){
      numberOfGames=3;
      sliceArrayIfBiggerThanTwenty(touchGameArrayLength);
    }

    function sliceArrayIfBiggerThanTen(a){
      touchGameArrayOne=touchGameArrayOne_1.slice(0,10);
      touchGameArrayTwo=touchGameArrayTwo_1.slice(0,10);
      let b=a-10;
      touchGameArrayOne_2=touchGameArrayOne_1.slice(b,a);
      touchGameArrayTwo_2=touchGameArrayTwo_1.slice(b,a);
    }

    function sliceArrayIfBiggerThanTwenty(a){
      touchGameArrayOne=touchGameArrayOne_1.slice(0,10);
      touchGameArrayTwo=touchGameArrayTwo_1.slice(0,10);
      touchGameArrayOne_2=touchGameArrayOne_1.slice(10,20);
      touchGameArrayTwo_2=touchGameArrayTwo_1.slice(10,20);
      let b=a-10;
      touchGameArrayOne_3=touchGameArrayOne_1.slice(b,a);
      touchGameArrayTwo_3=touchGameArrayTwo_1.slice(b,a);
    }
    startingTouchGame();
}

/* TOUCH GAME FUNCTION */
function startingTouchGame(){
    playAgainIndex=1;
    document.getElementById("menu-right").style.display="none";
    hmMainTwo.style.display="none";
    answerTimer=setInterval(myTimer,50);

    touchGameDiv.style.display="block";
    prepareDvButtonsContainer();
    touchGameOpen=true;
    localStorage.training_mode=1;
}

function prepareDvButtonsContainer(){
  dvButtons.innerHTML="";
  for(var i=1;i<=touchGameArrayOne.length;i++){
    dvButtons.innerHTML+="<div class='dv-four-option-button' id='"+i+"' onclick='verifyClick(this)'></div>";
  }
  if(dvButtons.childElementCount>=9){
    touchGameFinishDiv.style.height='400px';
  }
  touchGameDiv.style.paddingBottom='35px';
  arrayOneShuffle();
}

function playAgainTouchGame(a){
  if(varB_rW2[0]=="#"){
    varA_rW=[];
    varB_rW=[];
    varA=varA_rW2;
    varB=varB_rW2;
    randomWords_ForLoop();
    openDivStudy3();
  }

  if(a==2){
    playAgainIndex=2;
    touchGameArrayOne=touchGameArrayOne_2;
    touchGameArrayTwo=touchGameArrayTwo_2;
  }else if(a==3){
    playAgainIndex=3;
    touchGameArrayOne=touchGameArrayOne_3;
    touchGameArrayTwo=touchGameArrayTwo_3;
  }else{
    playAgainIndex=1;
  }
  document.getElementsByClassName("touch-game-div")[0].style.display="block";
  touchGameFinishDiv.style.display="none";
  answerTimer=setInterval(myTimer,50);

  buttonsAnsDefinitionFirstIteration=false;
  becameWhiteOnlyInOrangeDivBlink=false;
  userCorrectAnswerConfirmation=false;
  userWrongAnswerConfirmation=false;
  userClickedInWrongDiv=false;
  touchGameIndex=0;
  dvButtons.style.display="block";
  arrayOneShuffle();
}

/* HERE WE SHUFFLE array1 */
function arrayOneShuffle(){
  function shuffle(a){
    var x=a.length,t,r;
    while(0!==x){
      r=Math.floor(Math.random()*x);
      x-=1;
      t=a[x];
      a[x]=a[r];
      a[r]=t;
    }
    return [a];
  }
  shuffle(touchGameArrayOne);
  arrayTwoShuffle();
}

/* HERE WE SHUFFLE array2 */
function arrayTwoShuffle(){
  function shuffle(a){
    var x=a.length,t,r;
    while(0!==x){
      r=Math.floor(Math.random()*x);
      x-=1;
      t=a[x];
      a[x]=a[r];
      a[r]=t;
    }
    return [a];
  }
  shuffle(touchGameArrayTwo);
  ansButtonsLoop();
}

function ansButtonsLoop(){
  for(var i=0;i<dvButtons.childElementCount;i++){
      buttonsAnswersFontSize(i);
  }

  /* TOUCH GAME FINISH */
  if(touchGameIndex==dvButtons.childElementCount){
    touchGameReset();

    /* HERE WE PREPARE THE INFO INSIDE THE BUTTONS */
    for(var i=0;i<dvButtons.childElementCount;i++){
      var dvButtonId=document.getElementById(i+1);
      dvButtonId.setAttribute("class","dv-four-option-button");
    }

    /* THE USER FINISH THE GAME AND NOW HE NEEDS TO DECIDE 'PLAY AGAIN' 'NEXT GAME' 'EXIT' */
    document.getElementsByClassName("touch-game-div")[0].style.display="none";
    touchGameFinishDiv.style.display="block";
    if(playAgainIndex==1){
      document.getElementById("play-again-btn").setAttribute("onclick","playAgainTouchGame(1)");
      if(varA.length>10){
        document.getElementById("next-game-btn").setAttribute("onclick","playAgainTouchGame(2)");
        document.getElementById("next-game-btn").style.display="block";
      }else{
        document.getElementById("next-game-btn").style.display="none";
        touchGameFinishDiv.style.height='345px';
      }
    }else if(playAgainIndex==2){
      document.getElementById("play-again-btn").setAttribute("onclick","playAgainTouchGame(2)");
      if(varA.length>20){
        document.getElementById("next-game-btn").setAttribute("onclick","playAgainTouchGame(3)");
        document.getElementById("next-game-btn").style.display="block";
      }else{
        document.getElementById("next-game-btn").style.display="none";
        touchGameFinishDiv.style.height='345px';
      }
    }else{
      document.getElementById("play-again-btn").setAttribute("onclick","playAgainTouchGame(3)");
      document.getElementById("next-game-btn").style.display="none";
      touchGameFinishDiv.style.height='345px';
    }
    return;
  }

  var touchGameQuestionLength=touchGameArrayTwo[touchGameIndex][dvQuestionTextIndex].length;

  touchTimeout1=setTimeout(function(){
    dvQuestionText.style.lineHeight="27px";

    if(touchGameQuestionLength>95){
      dvQuestionText.style.fontSize="16px";
    }else if(touchGameQuestionLength>90){
      dvQuestionText.style.fontSize="17px";
    }else if(touchGameQuestionLength>85){
      dvQuestionText.style.fontSize="18px";
    }else if(touchGameQuestionLength>75){
      dvQuestionText.style.fontSize="19px";
    }else if(touchGameQuestionLength>60){
      dvQuestionText.style.fontSize="19px";
    }else if(touchGameQuestionLength>50){
      dvQuestionText.style.fontSize="20px";
    }else if(touchGameQuestionLength>35){
      dvQuestionText.style.fontSize="21px";
    }else if(touchGameQuestionLength>25){
      dvQuestionText.style.fontSize="22px";
    }else if(touchGameQuestionLength>20){
      dvQuestionText.style.fontSize="23px";
    }else if(touchGameQuestionLength>15){
      dvQuestionText.style.fontSize="27px";
    }else{
      dvQuestionText.style.fontSize="31px";
    }
    dvQuestionText.innerHTML=touchGameArrayTwo[touchGameIndex][dvQuestionTextIndex];
  },100);

  for(var i=0;i<dvButtons.childElementCount;i++){

    if(!buttonsAnsDefinitionFirstIteration){
      var dvButtonInnerText=document.getElementById(i+1);
      dvButtonInnerText.innerHTML=touchGameArrayOne[i][typeOfTextInButtonsAnswers].replace(/<sup>.*?<\/sup>/g,'');
    }

    if(touchGameArrayOne[i][typeOfTextInButtonsAnswers]==touchGameArrayTwo[touchGameIndex][typeOfTextInButtonsAnswers]){
      verifyWhatDivIdIsCorrectForOrangeBlink=i+1;
    }
  }
  buttonsAnsDefinitionFirstIteration=true;
}

function buttonsAnswersFontSize(i){
    var answerButtonLength=touchGameArrayOne[i][typeOfTextInButtonsAnswers].length;

    if(window.innerWidth>320){
        if(answerButtonLength<10){
          buttonsAnswersClass[i].style.fontSize="16px";/*19px*/
        }else if(answerButtonLength<15){
          buttonsAnswersClass[i].style.fontSize="16px";/*18px*/
        }else{
          buttonsAnswersClass[i].style.fontSize="16px";/*17px*/
        }
    }else{
        if(answerButtonLength<10){
          buttonsAnswersClass[i].style.fontSize="15px";/*18px*/
        }else if(answerButtonLength<15){
          buttonsAnswersClass[i].style.fontSize="15px";/*17px*/
        }else{
          buttonsAnswersClass[i].style.fontSize="15px";/*16px*/
        }
    }
}

function verifyClick(z){
  var x=z.innerHTML;
      x=x.toLowerCase();
  var y=touchGameArrayTwo[touchGameIndex][typeOfTextInButtonsAnswers].replace(/<sup>.*?<\/sup>/g,'');
      y=y.toLowerCase();
  if(x==y){
    z.setAttribute("class","dv-four-option-button dv-correct blocking-dv-buttons-container");
    userCorrectAnswerConfirmation=true;
    nextQuestion();
  }else{
    redWrongDivId=z;
    userClickedInWrongDiv=true;
    userWrongAnswerConfirmation=true;
    z.setAttribute("class","dv-four-option-button dv-wrong");
    dvButtons.setAttribute("class","dv-buttons-container blocking-dv-buttons-container");
    becameWhiteOnlyInOrangeDivBlink=true;
    wrongAnswer();
  }
}

function wrongAnswer(){
  clearInterval(answerTimer);
  touchTimeout2=setTimeout(function(){
    verifyIfExistsMoreThanOneAnswerWithTheSameValue();
    dvButtons.setAttribute("class","dv-buttons-container blocking-dv-buttons-container");
    becameWhiteOnlyInOrangeDivBlink=true;
    nextQuestion();
  },400);
}

var seconds=0;
var milliSeconds=50;

function myTimer(){
  // 02.01.2023 //
  seconds+=1;/*50*/
  timeForUserToAnswer=(touchGameArrayTwo[touchGameIndex][dvQuestionTextIndex].length*milliSeconds)+3500;
  if(seconds>=timeForUserToAnswer){
    verifyIfExistsMoreThanOneAnswerWithTheSameValue();
    dvButtons.setAttribute("class","dv-buttons-container blocking-dv-buttons-container");
    becameWhiteOnlyInOrangeDivBlink=true;
    nextQuestion();
  }
}

function verifyIfExistsMoreThanOneAnswerWithTheSameValue(){
    var x=document.getElementById(verifyWhatDivIdIsCorrectForOrangeBlink);
    if(x.classList.contains("dv-four-option-button")&&
       x.classList.contains("dv-correct")&&
       x.classList.contains("blocking-dv-buttons-container")){
        var y=document.getElementsByClassName("dv-four-option-button");
        var z=document.getElementById(verifyWhatDivIdIsCorrectForOrangeBlink);
        for(var i=0;i<dvButtons.childElementCount;i++){
            if((y[i].innerHTML==z.innerHTML)&&
               !y[i].classList.contains("dv-correct")&&
               !y[i].classList.contains("blocking-dv-buttons-container")){
                    y[i].setAttribute("class","dv-four-option-button dv-orange-blink blocking-dv-buttons-container");
            }
        }
    }else{
        document.getElementById(verifyWhatDivIdIsCorrectForOrangeBlink).setAttribute("class","dv-four-option-button dv-orange-blink blocking-dv-buttons-container");
    }
}

function nextQuestion(){
  clearInterval(answerTimer);
  seconds=0;
  if(userCorrectAnswerConfirmation){
    timeToNextQuestion=300;
    userCorrectAnswerConfirmation=false;
  }else{
    timeToNextQuestion=1500;
  }
  touchTimeout3=setTimeout(function(){
    answerTimer=setInterval(myTimer,50);
    if(userClickedInWrongDiv){
      redWrongDivId.setAttribute("class","dv-four-option-button");
      userClickedInWrongDiv=false;
    }
    dvButtons.setAttribute("class","dv-buttons-container");
    touchGameIndex++;
    ansButtonsLoop();
  },timeToNextQuestion);
}

function touchGameReset(){
  dvButtons.setAttribute("class","dv-buttons-container");
  buttonsAnsDefinitionFirstIteration=false;
  userCorrectAnswerConfirmation=false;
  userWrongAnswerConfirmation=false;
  userClickedInWrongDiv=false;
  userClickHintButton=false;
  touchGameIndex=0;
  seconds=0;
  dvQuestionText.innerHTML="";
  clearInterval(answerTimer);
  clearTimeout(touchTimeout1);
  clearTimeout(touchTimeout2);
  clearTimeout(touchTimeout3);
}

function touchGameClose(a=0){
  // 30.04.2023 //
  if((varA_rW2[mainIndex].match(/^\d+$/))&&(a==0)){
    varA=varA_rW2;
    varB=varB_rW2;
  }
  touchGameReset();
  closeDivStudy(a);
  specialCharsFirstIteration_bool=true;
  keyboardSpecialCharsFirstIteration();
  touchGameOpen=false;
}
/* TOUCH GAME */

function vocabularyDivToggle(id,a){
  var vocabularyCatDv=document.getElementsByClassName('vocabulary-cat-dv');

  if(document.getElementById(id).style.display=='block'){
    setTimeout(()=>{
        document.getElementById(id).style.display='none';
    },100);
  }else{
    for(let i=0;i<vocabularyCatDv.length;i++){
      vocabularyCatDv[i].style.display='none';
    }
    var menuLanguageClickScroll=a.offsetTop;
    var elementLanguageClickScroll=document.getElementById('all-levels2').offsetTop;
    var distanceToScroll=menuLanguageClickScroll-elementLanguageClickScroll;
    setTimeout(()=>{
        document.getElementById(id).style.display='block';
        if(window.innerWidth<1020){
          document.getElementById('all-levels2').scrollTop=distanceToScroll+55;
        }else{
          document.getElementById('all-levels2').scrollTop=distanceToScroll+75;
        }
    },100);
  }
}

var userAnswerSC;
var specialCharsArrayWithoutCorrectChar;
var specialCharsFirstIteration_bool=true;
var userAnswerLength_1;
var keyboardSpecialChars;
var germanArraySpecialChars=false;

function keyboardSpecialChars(a=''){
  if((dontShowKeyboard==0)&&(gameUrlNumber>=100)){

    if(!traineeGameRunning){
        userAnswerSC=varB[mainIndex];
    }else{
        if(a.includes(' =')){
            userAnswerSC=c[mainIndex];
        }else{
            userAnswerSC=c[mainIndex].replace(' = ',' ');
        }
    }

    var userAnswerLength_2=a.length;

    if(typeof userAnswerSC[userAnswerLength_2]=='undefined'){
        // THE LAST LETTER WAS ALREADY SHOWN //
        document.getElementById('special-chars-keyboard').innerHTML="";
        return;
    }

    document.getElementById('training-mode-btn').style.bottom='6px';
    document.getElementById('go-hangman').style.bottom='6px';

    var verifyingIfLetterIsSpaceQuotesHyphen=userAnswerSC[userAnswerLength_2].match(/[-'Â´`]/g);

    if(verifyingIfLetterIsSpaceQuotesHyphen){
        if(window.innerWidth<1020){
            document.getElementById('training-mode-btn').style.bottom='-2px';
            document.getElementById('go-hangman').style.bottom='-2px';
        }else{
            document.getElementById('training-mode-btn').style.bottom='6px';
            document.getElementById('go-hangman').style.bottom='6px';
        }
        document.getElementById('special-chars-keyboard').innerHTML='<input type="button" value=" '+userAnswerSC[userAnswerLength_2]+' " onclick="specialCharBtnValue(this.value)" tabindex="1">';
        return;
    }

    var verifyingIfLetterIsSpecialChar=userAnswerSC[userAnswerLength_2].match(/[^a-z0-9 ]/gi);

    if(verifyingIfLetterIsSpecialChar){
      if(((gameUrlNumber>=100)&&(gameUrlNumber<300))
        ||((gameUrlNumber>=400)&&(gameUrlNumber<500))
        ||((gameUrlNumber>=900)&&(gameUrlNumber<1000))
        ||((gameUrlNumber>=100000)&&(gameUrlNumber<=999999))){
          /* SPANISH */
          /* ITALIAN */
          /* PORTUGUESE */
          /* CATALAN */
          var specialCharsArray=["Ã¡","Ã ","Ã£","Ã¢","Ã¤","Ã©","Ã¨","Ãª","Ã«","Ã­","Ã¬","Ã®","Ã¯","Ã³","Ã²","Ãµ","Ã´","Ã¶","Ãº","Ã¹","Ã»","Ã¼","Ã§"];
      }else if((gameUrlNumber>=300)&&(gameUrlNumber<400)){
          /* GERMAN */
          germanArraySpecialChars=true;
          var specialCharsArray=["Ã¤","Ã¶","Ã¼","ÃŸ"];
      }else if((gameUrlNumber>=500)&&(gameUrlNumber<600)){
          /* CHINESE */
          var specialCharsArray=["åˆ°","è¯´","å’Œ","åœ°","ä¹Ÿ","å­","æ—¶","é“","å‡º","è€Œ","è¦","äºŽ","å°±","ä¸‹","å¾—","å¯","ä½ ","å¹´","ç”Ÿ","çš„","æ˜¯","ä¸","äºº","æˆ‘","åœ¨","æœ‰","ä»–","è¿™","ä¸º","å¤§","æ¥","ä»¥","ä¸­","ä»¬","è‡ª","ä¼š","é‚£","åŽ","èƒ½","å¯¹","ç€","äº‹","å…¶","é‡Œ","æ‰€","åŽ»","è¡Œ","è¿‡","å®¶","ç”¨","å‘","å¤©","å¦‚","ç„¶","ä½œ","æˆ","è€…","å¤š","éƒ½","æ— ","ç»","æ³•","èµ·","ä¸Ž","å¥½","çœ‹","å­¦","è¿›","ç§","å°†","è¿˜","åˆ†","æ­¤","å‰","é¢","å®š","ä¸»","æ²¡","å…¬"];
      }else if((gameUrlNumber>=600)&&(gameUrlNumber<700)){
          /* RUSSIAN */
          var specialCharsArray=["Ð","Ð‘","Ð’","Ð“","Ð”","Ð•","Ð","Ð–","Ð—","Ð˜","Ð™","Ðš","Ð›","Ðœ","Ð","Ðž","ÐŸ","Ð ","Ð¡","Ð¢","Ð£","Ð¤","Ð¥","Ð¦","Ð§","Ð¨","Ð©","Ðª","Ð«","Ð¬","Ð­","Ð®","Ð¯"];
      }else if((gameUrlNumber>=700)&&(gameUrlNumber<800)){
          /* JAPANESE */
          var specialCharsArray=["å¤§","å¹´","ä¸­","ä¼š","äºº","æœ¬","æœˆ","é•·","ç”Ÿ","å­","åˆ†","æ±","è¡Œ","åŒ","ä»Š","é«˜","é‡‘","æ™‚","æ‰‹","è¦‹","å¸‚","åŠ›","ç±³","è‡ª","å‰","å††","åˆ","ç«‹","å†…","äº‹","ç¤¾","è€…","åœ°","äº¬","é–“","ä½“","å­¦","ä¸‹","ç›®","äº”","å¾Œ","æ–°","æ˜Ž","æ–¹","éƒ¨","æ°‘","å¯¾","ä¸»","æ­£","ä»£","è¨€","ä¹","å°","æ€","å®Ÿ","å ´","é‡Ž","é–‹","å…¨","å®š","å®¶","åŒ—","å…­","è©±","æ–‡","å‹•","åº¦","çœŒ","æ°´","å®‰","æ°","å’Œ","æ”¿","ä¿","è¡¨","é“","ç›¸","æ„","ç™º","ä¸","å…š"];
      }else{
          /* normal quiz game (no keyboard) */
          return;
      }

      if(window.innerWidth<1020){
          document.getElementById('training-mode-btn').style.bottom='-2px';
          document.getElementById('go-hangman').style.bottom='-2px';
      }else{
          document.getElementById('training-mode-btn').style.bottom='6px';
          document.getElementById('go-hangman').style.bottom='6px';
      }

      if(!germanArraySpecialChars){
        /* REMOVING SPECIAL CHAR FROM ARRAY */
        specialCharsArrayWithoutCorrectChar=specialCharsArray.filter(e => e !== userAnswerSC[userAnswerLength_2]);

        startShuffle();

        specialCharsArrayWithoutCorrectChar=specialCharsArrayWithoutCorrectChar.slice(0,3);

        specialCharsArrayWithoutCorrectChar.push(userAnswerSC[userAnswerLength_2]);

        startShuffle();

        document.getElementById('special-chars-keyboard').innerHTML="<input type='button' value=' "+specialCharsArrayWithoutCorrectChar[0]+" ' onclick='specialCharBtnValue(this.value)' tabindex='1'><input type='button' value=' "+specialCharsArrayWithoutCorrectChar[1]+" ' onclick='specialCharBtnValue(this.value)' tabindex='1'><input type='button' value=' "+specialCharsArrayWithoutCorrectChar[2]+" ' onclick='specialCharBtnValue(this.value)' tabindex='1'><input type='button' value=' "+specialCharsArrayWithoutCorrectChar[3]+" ' onclick='specialCharBtnValue(this.value)' tabindex='1'>";
      }else{
        document.getElementById('special-chars-keyboard').innerHTML="<input type='button' value=' "+specialCharsArray[0]+" ' onclick='specialCharBtnValue(this.value)' tabindex='1'><input type='button' value=' "+specialCharsArray[1]+" ' onclick='specialCharBtnValue(this.value)' tabindex='1'><input type='button' value=' "+specialCharsArray[2]+" ' onclick='specialCharBtnValue(this.value)' tabindex='1'><input type='button' value=' "+specialCharsArray[3]+" ' onclick='specialCharBtnValue(this.value)' tabindex='1'>";
      }
    }else{
      document.getElementById('special-chars-keyboard').innerHTML="";
    }
  }
}

function startShuffle(){
  function shuffle(d){
    var e=d.length,f,g;

    while(0!==e){
      g=Math.floor(Math.random()*e);
      e-=1;
      f=d[e];
      d[e]=d[g];
      d[g]=f;
    }
    return [d];
  }
  shuffle(specialCharsArrayWithoutCorrectChar);
}

function specialCharBtnValue(a){
  userAnswerValue=document.getElementById('next-game2-input-text').value;
  document.getElementById('next-game2-input-text').value=userAnswerValue+a.trim();
  document.getElementById('next-game2-input-text').focus();
  userAnswerValue=document.getElementById('next-game2-input-text').value;
  keyboardSpecialChars(userAnswerValue);
}

function keyboardSpecialCharsFirstIteration(){
  if(specialCharsFirstIteration_bool){
    keyboardSpecialChars();
    specialCharsFirstIteration_bool=false;
  }
}

var touchGameMenuOpen=true;

function touchGameCloseMenu(){
    var touchGameAllGamesSpan=document.getElementsByClassName('touch-game-all-games')[0];
    if(touchGameMenuOpen){
        touchGameAllGamesSpan.setAttribute("onclick","returnToGameResp();touchGameCloseMenu();");
        touchGameMenuOpen=false;
    }else{
        touchGameAllGamesSpan.setAttribute("onclick","allLevelsResp();yyy2('all-levels letters3-list','1i');goToLiGameWhenRefresh();touchGameCloseMenu();");
        touchGameMenuOpen=true;
    }
}

/* NEW STUDY GAME */

var nsgVerifyButton=document.getElementById('nsg-verify-button');
var nsgReturnButton=document.getElementById('nsg-return-button');
var nsgClearButton=document.getElementById('nsg-clear-button');
var nsgNextButton=document.getElementById('nsg-next-button');
var nsgSkipButton=document.getElementById('nsg-skip-button');
var nsgMainDiv=document.getElementsByClassName('nsg-main-div')[0];
var nsgDivWithAnswerButtons=document.getElementsByClassName('nsg-div-with-answer-buttons')[0];
var btnBlindText=document.getElementById('btn-blind-text');
var nsgFinalDiv=document.getElementById('nsg-final-div');
var nsgReturnToQuizButton=document.getElementsByClassName('nsg-return-to-quiz-button')[0];
var nsgVarAcontainUnderline;
var nsgVarA_aux_mainIndex;
var nsgUnderlineIndexOf;
var nsgVarA_aux_mainIndex_plus_varB_usedToVerifyAnswer;
var nsg_clearBtn=false;
var nsgUserClickSkipButton=false;
var redInfoTransp=false;
var nsgRedSpanClass=document.getElementsByClassName('nsg-red-span');

function newStudyGame(){
  varA[mainIndex]=varA[mainIndex].replace(/\s?<sup>.*?<\/sup>/gi,'');
  varB[mainIndex]=varB[mainIndex].replace(/\s?<sup>.*?<\/sup>/gi,'');
  document.getElementById("menu-right").style.display="none";
  hmMainTwo.style.display="none";
  nsgMainDiv.style.display="block";
  nsgVerifyButton.style.display='none';
  nsgReturnButton.style.display='none';
  nsgClearButton.style.display='none';
  nsgNextButton.style.display='block';
  nsgSkipButton.style.display='block';
  nsgMainDiv.style.height='310px';
  nsgDivWithAnswerButtons.style.display='none';
  btnBlindText.style.display="none";
  nsgSecondaryDiv.style.color='black';
  nsgFinalDiv.style.display="none";
  nsgUserClickSkipButton=false;
  nsgReturnToQuizButton.style.display="block";
  if(varA[mainIndex].match(/___\.$/g)){
    nsgVarA_aux_mainIndex=varA[mainIndex].replace(/\.$/g,'');
  }else{
    nsgVarA_aux_mainIndex=varA[mainIndex];
  }
  if(varA[mainIndex].match(/(___|\.\.\.)/g)){
    if(varA[mainIndex].match(/(___)/g)){
      nsgUnderlineIndexOf=varA[mainIndex].indexOf('___');
    }else if(varA[mainIndex].match(/(\.\.\.)/g)){
      nsgUnderlineIndexOf=varA[mainIndex].indexOf('...');
    }
    nsgVarAcontainUnderline=true;
    nsgVarA_aux_mainIndex=nsgVarA_aux_mainIndex.replace(/(\.\.\.|___ =|= ___|___)/g,'<span class="nsg-red-span">' + varB[mainIndex] + '</span>');
    nsgVarA_aux_mainIndex=nsgVarA_aux_mainIndex.replace(/(\s\s)/g,' ');
    nsgSecondaryDiv.innerHTML=nsgVarA_aux_mainIndex;
    nsgVarA_aux_mainIndex=nsgVarA_aux_mainIndex.replace('<span class="nsg-red-span">','');
    nsgVarA_aux_mainIndex=nsgVarA_aux_mainIndex.replace('</span>','');
    nsgVarA_aux_mainIndex_plus_varB_usedToVerifyAnswer=nsgVarA_aux_mainIndex;
    nsgVarA_aux_mainIndex=nsgVarA_aux_mainIndex.replace(varB[mainIndex],'');
    nsgVarA_aux_mainIndex=nsgVarA_aux_mainIndex.trim();
  }else{
    nsgVarAcontainUnderline=false;
    nsgSecondaryDiv.innerHTML=nsgVarA_aux_mainIndex+'<span class="nsg-red-span nsg-red-span2">' + varB[mainIndex] + '</span>';
  }
  localStorage.training_mode=1;
  if(redInfoTransp){
    nsgRedSpanClass[0].style.color='transparent';
  }else{
    nsgRedSpanClass[0].style.color='red';
  }
}

var arrayContaining_varA_varB_Splitted;

function nsgNextButtonFunc(){
  nsgNextButton.setAttribute('class','nsg-btn-class');
  arrayContaining_varA_varB_Splitted='';
  let varA_Splitted=nsgVarA_aux_mainIndex.replace(/<img.*?>/g,'');
  let varB_Splitted=varB[mainIndex];
  // IF STRING IS BIGGER THAN 8 THEN DIVIDE INTO CHUNKS OF 2 //
  if(varB_Splitted.length>8){
      varB_Splitted=varB_Splitted.match(/.{1,2}/g);
  }else{
      varB_Splitted=varB_Splitted.replace(/\s/g,'').split('');
  }
  arrayContaining_varA_varB_Splitted=varA_Splitted.split(' ');
  let arrayContaining_varA_varB_Splitted_Aux=[];
  let nsgIndexAux=0;
  for(let i=0;i<arrayContaining_varA_varB_Splitted.length;i++){
    if((typeof arrayContaining_varA_varB_Splitted[i+1] == 'undefined')||(arrayContaining_varA_varB_Splitted[i].length + arrayContaining_varA_varB_Splitted[i+1].length >= 15)||(arrayContaining_varA_varB_Splitted.length<=3)){
      if(arrayContaining_varA_varB_Splitted[i]==''){
        continue;
      }
      arrayContaining_varA_varB_Splitted_Aux[nsgIndexAux]=arrayContaining_varA_varB_Splitted[i].replace(/\"/g,"&quot;");
    }else{
      //arrayContaining_varA_varB_Splitted_Aux[nsgIndexAux]=arrayContaining_varA_varB_Splitted[i].replace(/\"/g,"&quot;")+' '+arrayContaining_varA_varB_Splitted[i+1].replace(/\"/g,"&quot;");
      //i++;
      // 27.12.2022 //
      if((typeof arrayContaining_varA_varB_Splitted[i+2] == 'undefined')||(varA[mainIndex].length<40)){
        arrayContaining_varA_varB_Splitted_Aux[nsgIndexAux]=arrayContaining_varA_varB_Splitted[i].replace(/\"/g,"&quot;")+' '+arrayContaining_varA_varB_Splitted[i+1].replace(/\"/g,"&quot;");
        i++;
      }else{
        arrayContaining_varA_varB_Splitted_Aux[nsgIndexAux]=arrayContaining_varA_varB_Splitted[i].replace(/\"/g,"&quot;")+' '+arrayContaining_varA_varB_Splitted[i+1].replace(/\"/g,"&quot;")+' '+arrayContaining_varA_varB_Splitted[i+2].replace(/\"/g,"&quot;");
        i+=2;
      }
      // 27.12.2022 //
    }
    nsgIndexAux++;
  }
  arrayContaining_varA_varB_Splitted=arrayContaining_varA_varB_Splitted_Aux;
  arrayContaining_varA_varB_Splitted=arrayContaining_varA_varB_Splitted.concat(varB_Splitted);
  nsgReturnButton.style.display='block';
  nsgClearButton.style.display='block';
  nsgNextButton.style.display='none';
  nsgSkipButton.style.display='none';
  nsgDivWithAnswerButtons.style.display='block';
  if(textTransparent){
    nsgSecondaryDiv.style.color='transparent';
  }
  if((nsgSecondaryDivUserAnswer=='')||(nsg_clearBtn)){
    nsgPreparingRandomButtonsAnswer();
    let varA_varB_Splitted_Index_0=arrayContaining_varA_varB_Splitted.indexOf(varB_Splitted[0]);
    let varA_varB_Splitted_Index_1=arrayContaining_varA_varB_Splitted.indexOf(varB_Splitted[1]);
    if(varA_varB_Splitted_Index_0<varA_varB_Splitted_Index_1){
      nsgNextButtonFunc();
    }
    nsgInsertingRandomButtonsAnswerInDiv();
    nsgSecondaryDiv.innerHTML='*click in the words bellow, in the correct order.';
    nsg_clearBtn=false;
  }else{
    nsgDivWithAnswerButtons.innerHTML=nsgAnswerButtonsInsideDiv;
    nsgVerifyTheHeightOfSecondaryDiv();
    nsgSecondaryDiv.innerHTML=nsgSecondaryDivUserAnswer;
    let answerButtonsList=document.getElementsByClassName('answer-buttons-class');
    for(let i=0;i<nsgArrayWithAnswerButtonsId.length;i++){
      for(let j=0;j<answerButtonsList.length;j++){
        if(nsgArrayWithAnswerButtonsId[i]==answerButtonsList[j].id){
          answerButtonsList[j].style.color='transparent';
          answerButtonsList[j].disabled=true;
        }
      }
    }
  }
}

function nsgPreparingRandomButtonsAnswer(){
  function shuffle(d){
    let e=d.length,f,g;
    while(0!==e){
      g=Math.floor(Math.random()*e);
      e-=1;
      f=d[e];
      d[e]=d[g];
      d[g]=f;
    }
    return [d];
  }
  shuffle(arrayContaining_varA_varB_Splitted);
}

var nsgAnswerButtonsInsideDiv;

function nsgInsertingRandomButtonsAnswerInDiv(){
  nsgAnswerButtonsInsideDiv='';
  for(let i=0;i<arrayContaining_varA_varB_Splitted.length;i++){
    nsgAnswerButtonsInsideDiv+='<input id="btn-user-choice'+ i +'" type="button" class="answer-buttons-class" value="'+ arrayContaining_varA_varB_Splitted[i] +'" onclick="nsgButtonWordAnswer(this.value,this,this.id)">';
  }
  nsgDivWithAnswerButtons.innerHTML=nsgAnswerButtonsInsideDiv;
  nsgVerifyTheHeightOfSecondaryDiv();
}

function nsgVerifyTheHeightOfSecondaryDiv(){
  let nsgAnswerButtonsDivHeight=nsgDivWithAnswerButtons.offsetHeight;
  let nsgAnswerButtonsMinHeight_Plus=215+nsgAnswerButtonsDivHeight;
  if(nsgAnswerButtonsMinHeight_Plus<310){
    nsgAnswerButtonsMinHeight_Plus=310;
  }
  nsgMainDiv.style.height=nsgAnswerButtonsMinHeight_Plus+'px';
}

var nsgSecondaryDivUserAnswer='';
var nsgVerifyUserAnswerLengthEqualRealAnswerLength=1;
var nsgArrayWithAnswerButtonsId=[];

function nsgButtonWordAnswer(thisValue,this_el,thisId){
  nsgArrayWithAnswerButtonsId.push(thisId);
  nsgSecondaryDiv.innerHTML='';
  let secondaryDivMinusVarA=nsgSecondaryDivUserAnswer.length - varA[mainIndex].replace(/<img.*?>/g,'').length+1;
  if(secondaryDivMinusVarA<0){
    secondaryDivMinusVarA=0;
  }
  if((!nsgSecondaryDivUserAnswer.includes('='))&&(nsgSecondaryDivUserAnswer.length > varA[mainIndex].replace(/<img.*?>/g,'').length-1)&&(thisValue.length>=1)&&(varB[mainIndex].charAt(secondaryDivMinusVarA)!=' ')&&(!nsgVarAcontainUnderline)){
    nsgSecondaryDivUserAnswer+=thisValue;
  }else if((nsgVarAcontainUnderline)&&(nsgSecondaryDivUserAnswer.length+2 <= nsgUnderlineIndexOf+varB[mainIndex].length)&&(nsgSecondaryDivUserAnswer.length >= nsgUnderlineIndexOf)&&(nsgVarA_aux_mainIndex_plus_varB_usedToVerifyAnswer.charAt(nsgSecondaryDivUserAnswer.length+1)!=' ')){
    nsgSecondaryDivUserAnswer+=thisValue;
  }else{
    if(nsgSecondaryDivUserAnswer.length == nsgUnderlineIndexOf+varB[mainIndex]){
      nsgSecondaryDivUserAnswer+=' '+thisValue+' ';
    }else{
      nsgSecondaryDivUserAnswer+=thisValue+' ';
    }
  }
  nsgSecondaryDiv.innerHTML=nsgSecondaryDivUserAnswer;
  if(nsgVerifyUserAnswerLengthEqualRealAnswerLength==arrayContaining_varA_varB_Splitted.length){
    nsgVerifyButton.style.display='block';
    nsgReturnButton.style.display='none';
  }else{
    nsgVerifyUserAnswerLengthEqualRealAnswerLength++;
  }
  this_el.style.color='transparent';
  this_el.disabled=true;
}

function nsgClearButtonFunc(){
  nsgVerifyButton.style.display='none';
  nsgReturnButton.style.display='block';        
  nsgVerifyUserAnswerLengthEqualRealAnswerLength=1;
  nsgSecondaryDivUserAnswer='';
  nsgArrayWithAnswerButtonsId=[];
  var nsgAnswerButtonsElement_List=document.getElementsByClassName('answer-buttons-class');
  for(var i=0;i<nsgAnswerButtonsElement_List.length;i++){
    nsgAnswerButtonsElement_List[i].style.color='black';
  }
  nsgDivWithAnswerButtons.innerHTML='';
  setTimeout(()=>{
    nsgSecondaryDiv.innerHTML='*click in the words bellow, in the correct order.';
    nsg_clearBtn=true;
    nsgNextButtonFunc();
  },100);
}

function nsgReturnButtonFunc(){
  newStudyGame();
}

function nsgSkipButtonFunc(){
    nsgUserClickSkipButton=true;
    nsgVerifyButtonFunc();
}

function nsgVerifyButtonFunc(){
  nsgVerifyUserAnswerLengthEqualRealAnswerLength=1;
  nsgSecondaryDivUserAnswer='';
  let nsgSecondaryDivInnerHTML=nsgSecondaryDiv.innerHTML;
  if(!nsgVarAcontainUnderline){
    var nsg_varA_varB_array=nsgVarA_aux_mainIndex+varB[mainIndex];
  }else{
    var nsg_varA_varB_array=nsgVarA_aux_mainIndex_plus_varB_usedToVerifyAnswer;
  }
  nsgSecondaryDivInnerHTML=nsgSecondaryDivInnerHTML.replace(/\s/g,'');
  nsg_varA_varB_array=nsg_varA_varB_array.replace(/\s/g,'');
  nsg_varA_varB_array=nsg_varA_varB_array.replace(/<img.*?>/g,'');
  if((nsgSecondaryDivInnerHTML==nsg_varA_varB_array)||(nsgUserClickSkipButton)){
    /* CORRECT */
    mainIndex++;
    if(nsgUserClickSkipButton){
      nsgDisplayingCorrectOrWrongDiv(3);
    }else{
      nsgDisplayingCorrectOrWrongDiv(1);
    }
  }else{
    /* INCORRECT */
    nsgDisplayingCorrectOrWrongDiv(2);
  }
}

var nsgSecondaryDiv=document.getElementsByClassName('nsg-div-with-question-and-answer')[0];

function nsgDisplayingCorrectOrWrongDiv(a){
  document.getElementById('nsg-buttons-div').style.visibility='hidden';
  if(a!=3){
    if(a==1){
      nsgSecondaryDiv.innerHTML='correct!';
      nsgSecondaryDiv.setAttribute('class','nsg-div-with-question-and-answer nsg-correct-div nsg-correct-wrong-div');
    }else{
      nsgSecondaryDiv.innerHTML='incorrect!';
      nsgSecondaryDiv.setAttribute('class','nsg-div-with-question-and-answer nsg-wrong-div nsg-correct-wrong-div');
    }
    setTimeout(()=>{
      nsgAfterDisplayCorrectWrongInfo();
    },750);
  }else{
    nsgAfterDisplayCorrectWrongInfo();
  }
}

function nsgAfterDisplayCorrectWrongInfo(){
  document.getElementById('nsg-buttons-div').style.visibility='visible';
  nsgSecondaryDiv.setAttribute('class','nsg-div-with-question-and-answer');
  nsgArrayWithAnswerButtonsId=[];
  if(mainIndex>=varA.length){
    newStudyGameFinish();
    return;
  }else{
    newStudyGame();
  }
}

var textTransparent=false;

function makeTextTransparent(){
  if(!textTransparent){
    nsgSecondaryDiv.style.color='transparent';
    textTransparent=true;
  }else{
    nsgSecondaryDiv.style.color='black';
    textTransparent=false;
  }
}

function newStudyGameFinish(){
  nsgFinalDiv.style.display="block";
  nsgMainDiv.style.display="none";
  nsgReturnToQuizButton.style.display="none";
}

function nsgPlayAgain(){
  mainIndex=0;
  newStudyGame();
}

function makeRedInfoTransparentNSG(){
  /*if(!redInfoTransp){
    nsgRedSpanClass[0].style.color='transparent';
    redInfoTransp=true;
  }else{
    nsgRedSpanClass[0].style.color='red';
    redInfoTransp=false;
  }*/
}

/* NEW STUDY GAME */

/* NEW STUDY GAME 2 */
/**/

var nsg2_VerifyButton=document.getElementById('nsg2-verify-button');
var nsg2_ReturnButton=document.getElementById('nsg2-return-button');
var nsg2_RedoButton=document.getElementById('nsg2-redo-question-button');
var nsg2_ClearButton=document.getElementById('nsg2-clear-button');
var nsg2_NextButton=document.getElementById('nsg2-next-button');
var nsg2_SkipButton=document.getElementById('nsg2-skip-button');
var nsg2_MainDiv=document.getElementsByClassName('nsg2-main-div')[0];
var nsg2_DivWithAnswerButtons=document.getElementsByClassName('nsg2-div-with-answer-buttons')[0];
var nsg2_FinalDiv=document.getElementById('nsg2-final-div');
var nsg2_ReturnToQuizButton=document.getElementsByClassName('nsg2-return-to-quiz-button')[0];
var nsg2_VarAcontainUnderline;
var nsg2_VarA_aux_mainIndex;
var nsg2_UnderlineIndexOf;
var nsg2_VarA_aux_mainIndex_plus_varB_usedToVerifyAnswer;
var nsg2_clearBtn=false;
var nsg2_UserClickSkipButton=false;

function newStudyGame2(){
  varA=[...varA_rW2];
  if(varB_rW2[0]=="#"){
    varB.fill("",0,varB_rW2.length);
  }else if(varB_rW2[0].match(/^\d+$/)){
    varA=[...varB_rW2];
    varB=[...varA_rW2];
  }else{
    varB=[...varB_rW2];
  }
  // 01.05.2023 //
  if((mainIndex>0)||(nsg2_PlayAgainBool)){
    nsg2_PlayAgainBool=false;
    document.getElementById("private-game-cheat-span").style.display="block";
    if(varB_rW2[0].match(/^\d+$/)){
      document.getElementById("private-game-cheat-span").innerHTML=varB_rW2[mainIndex]+" "+varA_rW2[mainIndex];
    }else if(varA_rW2[0].match(/^\d+$/)){
      document.getElementById("private-game-cheat-span").innerHTML=varA_rW2[mainIndex]+" "+varB_rW2[mainIndex];
    }
  }else{
    document.getElementById("private-game-cheat-span").style.display="none";
  }
  varA[mainIndex]=varA[mainIndex].replace(/\s?<sup>.*?<\/sup>/gi,'');
  varA[mainIndex]=varA[mainIndex].replace(/\s+/g,' ');
  varB[mainIndex]=varB[mainIndex].replace(/\s?<sup>.*?<\/sup>/gi,'');
  varB[mainIndex]=varB[mainIndex].replace(/\s+/g,' ');
  varB[mainIndex]=varB[mainIndex].replace(/âˆ’/g,'-');
  document.getElementById("menu-right").style.display="none";
  document.getElementById("game5-study-mode-choose-game").style.display="none";
  document.getElementsByClassName("nsg2-btn-class")[0].style.display="none";
  hmMainTwo.style.display="none";
  nsg2_MainDiv.style.display="block";
  nsg2_VerifyButton.style.display='none';
  nsg2_ReturnButton.style.display='none';
  nsg2_ClearButton.style.display='none';
  nsg2_NextButton.style.display='block';
  nsg2_MainDiv.style.height='425px';
  nsg2_DivWithAnswerButtons.style.display='none';
  nsg2_SecondaryDiv.style.color='black';
  nsg2_FinalDiv.style.display="none";
  nsg2_UserClickSkipButton=false;
  nsg2_ReturnToQuizButton.style.display="block";
  if(varA[mainIndex].match(/___\.$/g)){
    nsg2_VarA_aux_mainIndex=varA[mainIndex].replace(/\.$/g,'');
  }else{
    nsg2_VarA_aux_mainIndex=varA[mainIndex];
  }
  if(varA[mainIndex].match(/(___|\.\.\.)/g)){
    if(varA[mainIndex].match(/(___)/g)){
      nsg2_UnderlineIndexOf=varA[mainIndex].indexOf('___');
    }else if(varA[mainIndex].match(/(\.\.\.)/g)){
      nsg2_UnderlineIndexOf=varA[mainIndex].indexOf('...');
    }
    nsg2_VarAcontainUnderline=true;
    nsg2_VarA_aux_mainIndex=nsg2_VarA_aux_mainIndex.replace(/(\.\.\.|___ =|= ___|___)/g,'<span class="nsg2-red-span">' + varB[mainIndex] + '</span>');
    nsg2_VarA_aux_mainIndex=nsg2_VarA_aux_mainIndex.replace(/(\s\s)/g,' ');
    nsg2_SecondaryDiv.innerHTML=nsg2_VarA_aux_mainIndex+".";
    nsg2_VarA_aux_mainIndex=nsg2_VarA_aux_mainIndex.replace('<span class="nsg2-red-span">','');
    nsg2_VarA_aux_mainIndex=nsg2_VarA_aux_mainIndex.replace('</span>','');
    nsg2_VarA_aux_mainIndex_plus_varB_usedToVerifyAnswer=nsg2_VarA_aux_mainIndex;
    nsg2_VarA_aux_mainIndex=nsg2_VarA_aux_mainIndex.replace(varB[mainIndex],'');
    nsg2_VarA_aux_mainIndex=nsg2_VarA_aux_mainIndex.trim();
  }else{
    nsg2_VarAcontainUnderline=false;
    nsg2_SecondaryDiv.innerHTML=nsg2_VarA_aux_mainIndex+"."+'<span class="nsg2-red-span nsg2-red-span2">' + varB[mainIndex] + '</span>';
  }
  localStorage.training_mode=1;
}

var nsg2_arrayContaining_varA_varB_Splitted;
var nsg2_realArrayLength;
var nsg2_divideBigArrayInChunksOfTwelve;
var nsg2_divideBigArrayInChunksOfTwelveModulus;
var nsg2_indexBigArrayChunks=0;
var nsg2_arrayChunksOfTwelve;
var nsg2_nextButtonFirstIteration=true;

var ns2_arrayContaining_varA_varB_Splitted_Aux;
var nsg2_IndexAux;
var nsg2_varA_Splitted;
var nsg2_varB_Splitted;
var nsg2_arrayContaining_varA_varB_Splitted_Aux2;
var nsg2_maxNumberOfRandomWords=3;
var nsg2_nsgSecondaryDivUserAnswer2="";

function nsg2_NextButtonFunc(){
  if(nsg2_nextButtonFirstIteration){
    nsg2_NextButton.setAttribute('class','nsg2-btn-class');
    nsg2_arrayContaining_varA_varB_Splitted="";
    /**/
    nsg2_VarA_aux_mainIndex=nsg2_VarA_aux_mainIndex.replace(/<br><br>/gi,'<br>');
    nsg2_VarA_aux_mainIndex=nsg2_VarA_aux_mainIndex.replace(/<br>\s/gi,' ');
    nsg2_VarA_aux_mainIndex=nsg2_VarA_aux_mainIndex.replace(/<br>/gi,' ');
    /**/
    nsg2_varA_Splitted=nsg2_VarA_aux_mainIndex.replace(/<img.*?>/g,'');
    nsg2_varB_Splitted=varB[mainIndex];
    nsg2_varB_Splitted=nsg2_varB_Splitted.replace(/<br><br>/gi,' ');
    nsg2_varB_Splitted=nsg2_varB_Splitted.replace(/<br>/gi,' ');
    //nsg2_varB_Splitted=nsg2_varB_Splitted.replace(/\s/g,'').split('');

    // 30.04.2023 //
    // IF STRING IS BIGGER THAN 6 THEN DIVIDE INTO CHUNKS OF 2 //
    if(nsg2_varB_Splitted.length>6){
      nsg2_varB_Splitted=nsg2_varB_Splitted.match(/.{1,2}/g);
    }else{
      nsg2_varB_Splitted=nsg2_varB_Splitted.replace(/\s/g,'').split('');
    }

    if(nsg2_varA_Splitted.length>0){
      nsg2_arrayContaining_varA_varB_Splitted=nsg2_varA_Splitted.split(' ');
      nsg2_arrayContaining_varA_varB_Splitted=nsg2_arrayContaining_varA_varB_Splitted.concat(nsg2_varB_Splitted);
    }else{
      nsg2_arrayContaining_varA_varB_Splitted=nsg2_varB_Splitted;
    }

    nsg2_realArrayLength=nsg2_arrayContaining_varA_varB_Splitted;
    ns2_arrayContaining_varA_varB_Splitted_Aux=[];
    nsg2_IndexAux=0;
    nsg2_divideBigArrayInChunksOfTwelve=Math.ceil(nsg2_arrayContaining_varA_varB_Splitted.length/nsg2_maxNumberOfRandomWords);
    nsg2_divideBigArrayInChunksOfTwelveModulus=nsg2_arrayContaining_varA_varB_Splitted.length%nsg2_maxNumberOfRandomWords;
    nsg2_nextButtonFirstIteration=false;

    for(let i=0;i<nsg2_arrayContaining_varA_varB_Splitted.length;i++){
      if((typeof nsg2_arrayContaining_varA_varB_Splitted[i+1] == 'undefined')||(nsg2_arrayContaining_varA_varB_Splitted[i].length + nsg2_arrayContaining_varA_varB_Splitted[i+1].length >= 15)||(nsg2_arrayContaining_varA_varB_Splitted.length<=3)){
        if(nsg2_arrayContaining_varA_varB_Splitted[i]==''){
          continue;
        }
        ns2_arrayContaining_varA_varB_Splitted_Aux[nsg2_IndexAux]=nsg2_arrayContaining_varA_varB_Splitted[i].replace(/\"/g,"&quot;");
      }else{
        if((typeof nsg2_arrayContaining_varA_varB_Splitted[i+2] == 'undefined')||(varA[mainIndex].length<40)){
          ns2_arrayContaining_varA_varB_Splitted_Aux[nsg2_IndexAux]=nsg2_arrayContaining_varA_varB_Splitted[i].replace(/\"/g,"&quot;");
        }else{
          ns2_arrayContaining_varA_varB_Splitted_Aux[nsg2_IndexAux]=nsg2_arrayContaining_varA_varB_Splitted[i].replace(/\"/g,"&quot;");
        }
      }
      nsg2_IndexAux++;
    }
  }

  if((nsg2_divideBigArrayInChunksOfTwelve>1)&&(nsg2_divideBigArrayInChunksOfTwelveModulus!=0)&&(nsg2_indexBigArrayChunks+2==nsg2_divideBigArrayInChunksOfTwelve)){
    nsg2_arrayContaining_varA_varB_Splitted_Aux2=nsg2_arrayContaining_varA_varB_Splitted.slice(nsg2_indexBigArrayChunks*nsg2_maxNumberOfRandomWords,(nsg2_indexBigArrayChunks+2)*nsg2_maxNumberOfRandomWords);
  }else{
    nsg2_arrayContaining_varA_varB_Splitted_Aux2=nsg2_arrayContaining_varA_varB_Splitted.slice(nsg2_indexBigArrayChunks*nsg2_maxNumberOfRandomWords,(nsg2_indexBigArrayChunks+1)*nsg2_maxNumberOfRandomWords);
  }

  nsg2_ReturnButton.style.display='block';
  nsg2_ClearButton.style.display='block';
  nsg2_NextButton.style.display='none';
  nsg2_DivWithAnswerButtons.style.display='block';
  if((nsg2_SecondaryDivUserAnswer=='')||(nsg2_clearBtn)){
    nsg2_PreparingRandomButtonsAnswer();
    nsg2_InsertingRandomButtonsAnswerInDiv();
    if(nsg2_indexBigArrayChunks==0){
      nsg2_SecondaryDiv.innerHTML='*click in the words bellow, in the correct order.';
    }else{
      nsg2_SecondaryDiv.innerHTML=nsg2_nsgSecondaryDivUserAnswer2;
    }
    nsg2_clearBtn=false;
  }else{
    nsg2_DivWithAnswerButtons.innerHTML=nsg2_AnswerButtonsInsideDiv;
    nsg2_VerifyTheHeightOfSecondaryDiv();
    nsg2_SecondaryDiv.innerHTML=nsg2_SecondaryDivUserAnswer;
    let nsg2_answerButtonsList=document.getElementsByClassName('nsg2-answer-buttons-class');
    for(let i=0;i<nsg2_ArrayWithAnswerButtonsId.length;i++){
      for(let j=0;j<nsg2_answerButtonsList.length;j++){
        if(nsg2_ArrayWithAnswerButtonsId[i]==nsg2_answerButtonsList[j].id){
          nsg2_answerButtonsList[j].style.color='transparent';
          nsg2_answerButtonsList[j].disabled=true;
        }
      }
    }
  }
}

function nsg2_PreparingRandomButtonsAnswer(){
  function shuffle(d){
    let e=d.length,f,g;
    while(0!==e){
      g=Math.floor(Math.random()*e);
      e-=1;
      f=d[e];
      d[e]=d[g];
      d[g]=f;
    }
    return [d];
  }
  shuffle(nsg2_arrayContaining_varA_varB_Splitted_Aux2);
}

var nsg2_AnswerButtonsInsideDiv;

function nsg2_InsertingRandomButtonsAnswerInDiv(){
  nsg2_AnswerButtonsInsideDiv='';
  for(let i=0;i<nsg2_arrayContaining_varA_varB_Splitted_Aux2.length;i++){
    nsg2_AnswerButtonsInsideDiv+='<input id="btn-user-choice'+ i +'" type="button" class="nsg2-answer-buttons-class" value="'+ nsg2_arrayContaining_varA_varB_Splitted_Aux2[i] +'" onclick="nsg2_ButtonWordAnswer(this.value,this,this.id)">';
  }
  nsg2_DivWithAnswerButtons.innerHTML=nsg2_AnswerButtonsInsideDiv;
  nsg2_VerifyTheHeightOfSecondaryDiv();
}

function nsg2_VerifyTheHeightOfSecondaryDiv(){
  let nsg2_AnswerButtonsDivHeight=nsg2_DivWithAnswerButtons.offsetHeight;
  if(nsg2_AnswerButtonsDivHeight>150){
    nsg2_MainDiv.style.height=232+nsg2_AnswerButtonsDivHeight+'px';
  }else{
    nsg2_MainDiv.style.height="425px";
  }
}

var nsg2_SecondaryDivUserAnswer='';
var nsg2_VerifyUserAnswerLengthEqualRealAnswerLength=1;
var nsg2_ArrayWithAnswerButtonsId=[];

var nsg2_wordAnswerUserClickIndex=1;
var nsg2_nsgSecondaryDivUserAnswer3="";
var nsg2_bgChangeColorAfterClickBtn;
var nsg2_booleanToAvoidDoubleClickAfterFail=true;

function nsg2_ButtonWordAnswer(thisValue,this_el,thisId){
  document.getElementById("private-game-cheat-span").innerHTML="";
  if(nsg2_booleanToAvoidDoubleClickAfterFail){
    nsg2_ArrayWithAnswerButtonsId.push(thisId);
    nsg2_SecondaryDivUserAnswer=nsg2_SecondaryDivUserAnswer.replace(/\s+/gi," ");
    nsg2_SecondaryDiv.innerHTML=nsg2_SecondaryDivUserAnswer;

    let nsg2_secondaryDivMinusVarA=nsg2_SecondaryDivUserAnswer.length;
    nsg2_secondaryDivMinusVarA=(nsg2_secondaryDivMinusVarA+thisValue.length);

    let nsg2_varA_varB;

    if(varA[mainIndex].length>0){
      nsg2_varA_varB=varA[mainIndex]+" "+varB[mainIndex];
    }else{
      nsg2_varA_varB=varB[mainIndex];
    }
    nsg2_varA_varB=nsg2_varA_varB.replace(/<br><br>/gi," ");

    if((nsg2_varA_varB.charAt(nsg2_secondaryDivMinusVarA)==" ")&&(!thisValue.includes(" "))){
      nsg2_SecondaryDivUserAnswer+=thisValue+' ';
    }else{
      nsg2_SecondaryDivUserAnswer+=thisValue+'';
    }
    nsg2_SecondaryDiv.innerHTML=nsg2_SecondaryDivUserAnswer;

    // IF WRONG REDO GAME //
    let x=nsg2_varA_varB.replace(/\s+/g,"");
    x=nsg2_ascii_to_hexa(x);

    let y=nsg2_SecondaryDivUserAnswer.replace(/\s+/g,"");
    y=nsg2_ascii_to_hexa(y);

    let z=new RegExp('^'+y+'.*$','gi');
    let w=x.match(z);

    if(!w){
      nsg2_booleanToAvoidDoubleClickAfterFail=false;
      nsg2_SecondaryDiv.style.backgroundColor="pink";
      nsg2_DivWithAnswerButtons.style.backgroundColor="pink";
      nsg2_MainDiv.style.backgroundColor="pink";
      nsg2_SecondaryDivUserAnswer="";
      setTimeout(()=>{
        nsg2_SecondaryDiv.style.backgroundColor="white";
        nsg2_DivWithAnswerButtons.style.backgroundColor="transparent";
        nsg2_MainDiv.style.backgroundColor="beige";
        nsg2_ReturnButtonFunc();
        nsg2_RedoButtonFunc();
        nsg2_NextButtonFunc();
        nsg2_booleanToAvoidDoubleClickAfterFail=true;
      },500);
    }else{
      nsg2_nsgSecondaryDivUserAnswer3=nsg2_nsgSecondaryDivUserAnswer3.replace(/\s+/g," ");
      if(((nsg2_nsgSecondaryDivUserAnswer3).match(/\s/g) || []).length==3){
        nsg2_nsgSecondaryDivUserAnswer3="";
      }

      if(nsg2_VerifyUserAnswerLengthEqualRealAnswerLength==nsg2_realArrayLength.length){
        nsg2_VerifyButton.style.display='block';
        nsg2_ReturnButton.style.display='none';
        nsg2_VerifyButtonFunc();
      }else{
        nsg2_VerifyUserAnswerLengthEqualRealAnswerLength++;
        if(nsg2_wordAnswerUserClickIndex==nsg2_arrayContaining_varA_varB_Splitted_Aux2.length){
          nsg2_wordAnswerUserClickIndex=1;
          nsg2_indexBigArrayChunks++;
          nsg2_clearBtn=true;
          nsg2_nsgSecondaryDivUserAnswer2=nsg2_SecondaryDivUserAnswer;
          nsg2_ArrayWithAnswerButtonsId=[];
          nsg2_NextButtonFunc();
        }else{
          nsg2_wordAnswerUserClickIndex++;
        }
      }
      this_el.style.color='transparent';
    }
  }
}

function nsg2_ascii_to_hexa(x){
	var y=[];
	for(var n=0,l=x.length;n < l;n++){
    var z=Number(x.charCodeAt(n)).toString(16);
    y.push(z);
  }
	return y.join('');
}

function nsg2_ClearButtonFunc(){
  nsg2_ReturnButtonFunc();
  nsg2_NextButtonFunc();
  nsg2_VerifyButton.style.display='none';
  nsg2_ReturnButton.style.display='block';
  nsg2_RedoButton.style.display='block';
  nsg2_wordAnswerUserClickIndex=1;
  nsg2_nsgSecondaryDivUserAnswer3="";
  nsg2_VerifyUserAnswerLengthEqualRealAnswerLength=((nsg2_indexBigArrayChunks*nsg2_maxNumberOfRandomWords)+1);
  nsg2_SecondaryDivUserAnswer=nsg2_nsgSecondaryDivUserAnswer2;
  nsg2_ArrayWithAnswerButtonsId=[];
  var nsg2_AnswerButtonsElement_List=document.getElementsByClassName('nsg2-answer-buttons-class');
  for(var i=0;i<nsg2_AnswerButtonsElement_List.length;i++){
    nsg2_AnswerButtonsElement_List[i].style.color='black';
  }
  nsg2_DivWithAnswerButtons.innerHTML='';
  setTimeout(()=>{
    nsg2_SecondaryDiv.innerHTML='*click in the words bellow, in the correct order.';
    nsg2_clearBtn=true;
    nsg2_NextButtonFunc();
  },100);
}

function nsg2_ReturnButtonFunc(){
  newStudyGame2();
}

function nsg2_SkipButtonFunc(){
    nsg2_UserClickSkipButton=true;
    nsg2_VerifyButtonFunc();
}

function nsg2_VerifyButtonFunc(){
  nsg2_VerifyUserAnswerLengthEqualRealAnswerLength=1;
  nsg2_SecondaryDivUserAnswer='';
  let nsg2_SecondaryDivInnerHTML=nsg2_SecondaryDiv.innerHTML;
  if(!nsg2_VarAcontainUnderline){
    var nsg2_varA_varB_array=nsg2_VarA_aux_mainIndex+varB[mainIndex];
  }else{
    var nsg2_varA_varB_array=nsg2_VarA_aux_mainIndex_plus_varB_usedToVerifyAnswer;
  }
  nsg2_SecondaryDivInnerHTML=nsg2_SecondaryDivInnerHTML.replace(/\s+/g,'');
  nsg2_varA_varB_array=nsg2_varA_varB_array.replace(/<br>/gi,'');
  nsg2_varA_varB_array=nsg2_varA_varB_array.replace(/\s+/g,'');
  nsg2_varA_varB_array=nsg2_varA_varB_array.replace(/<img.*?>/g,'');

  nsg2_SecondaryDivInnerHTML=$('<textarea />').html(nsg2_SecondaryDivInnerHTML).text();
  if((nsg2_SecondaryDivInnerHTML==nsg2_varA_varB_array)||(nsg2_UserClickSkipButton)){
    /* CORRECT */
    // 01.05.2023 //
    //if(((!nsg2_userClickRedoBtn)&&(!varB_rW2[0].match(/^\d+$/)))||(nsg2_UserClickSkipButton)){
    if(((!nsg2_userClickRedoBtn)&&((!varB_rW2[0].match(/^\d+$/))&&(!varA_rW2[0].match(/^\d+$/))))||(nsg2_UserClickSkipButton)){
      mainIndex++;
    }
    if(nsg2_UserClickSkipButton){
      nsg2_DisplayingCorrectOrWrongDiv(1);
    }else{
      nsg2_DisplayingCorrectOrWrongDiv(1);
    }
    nsg2_nsgSecondaryDivUserAnswer2="";
  }else{
    /* INCORRECT */
    nsg2_DisplayingCorrectOrWrongDiv(2);
  }
  /**/
  nsg2_nextButtonFirstIteration=true;
  nsg2_wordAnswerUserClickIndex=1;
  nsg2_indexBigArrayChunks=0;
  /**/
}

var nsg2_userClickRedoBtn=false;

function nsg2_RedoButtonFunc(){
  nsg2_userClickRedoBtn=true;
  nsg2_VerifyButtonFunc();
}

var nsg2_SecondaryDiv=document.getElementsByClassName('nsg2-div-with-question-and-answer')[0];

function nsg2_DisplayingCorrectOrWrongDiv(a){
  document.getElementById('nsg2-buttons-div').style.visibility='hidden';
  if(a!=3){
    if(a==1){
      if(!nsg2_userClickRedoBtn){
        if(!nsg2_UserClickSkipButton){
          nsg2_SecondaryDiv.innerHTML='correct!';
          nsg2_SecondaryDiv.setAttribute('class','nsg2-div-with-question-and-answer nsg2-correct-div nsg2-correct-wrong-div');
        }
      }
    }else{
      if(!nsg2_userClickRedoBtn){
        nsg2_SecondaryDiv.innerHTML='incorrect!';
        nsg2_SecondaryDiv.setAttribute('class','nsg2-div-with-question-and-answer nsg2-wrong-div nsg2-correct-wrong-div');
      }else{
        nsg2_SecondaryDiv.innerHTML='';
      }
      nsg2_SecondaryDivUserAnswer="";
      nsg2_nsgSecondaryDivUserAnswer2="";
    }
    let timer;
    if((!nsg2_userClickRedoBtn)&&(!nsg2_UserClickSkipButton)){
      timer=750;
    }else{
      timer=10;
    }
    setTimeout(()=>{
      nsg2_AfterDisplayCorrectWrongInfo();
    },timer);
  }else{
    nsg2_AfterDisplayCorrectWrongInfo();
  }
}

function nsg2_AfterDisplayCorrectWrongInfo(){
  document.getElementById('nsg2-buttons-div').style.visibility='visible';
  nsg2_SecondaryDiv.setAttribute('class','nsg2-div-with-question-and-answer');
  nsg2_ArrayWithAnswerButtonsId=[];
  nsg2_nsgSecondaryDivUserAnswer3="";
  if(mainIndex>=varA.length){
    newStudyGame2_Finish();
    return;
  }else{
    if(!nsg2_userClickRedoBtn){
      newStudyGame2();
      nsg2_NextButtonFunc();
    }else{
      nsg2_userClickRedoBtn=false;
      nsg2_VerifyButton.style.display='none';
    }
  }
}

function newStudyGame2_Finish(){
  nsg2_FinalDiv.style.display="block";
  nsg2_MainDiv.style.display="none";
  nsg2_ReturnToQuizButton.style.display="none";
}

var nsg2_PlayAgainBool=false;

function nsg2_PlayAgain(){
  nsg2_PlayAgainBool=true;
  mainIndex=0;
  newStudyGame2();
  nsg2_NextButtonFunc();
}

function newStudyGame2_close(){
  setTimeout(()=>{
    touchGameClose(2);
  },50);
  setTimeout(()=>{
    nsg2_RedoButtonFunc();
  },500);
}

/**/
/* NEW STUDY GAME 2 */

function inputTextFocus(){
    document.getElementById('next-game2-input-text').focus();
}

var userCheat=false;
var userGoBackQuestion=false;
var userAskForFastAnswerIndex;

function showAnswerInAlert(userAnsValue,thisElement){
  if(adminUser){
    if(userAnsValue.match(/\s\s/g)){
      thisElement.value='';
    }
    if(varA_rW2[0].match(/^\d+$/)){
      let realStringInDB=varB_rW2[mainIndex];
      // WE NEED TO DO THIS BECAUSE THE PARENTHESES ARE CAUSING PROBLEMS IN MATCH METHOD
      realStringInDB=escapeSpecialCharsRegExp(realStringInDB,1);
      let x=userAnsValue;
      x=escapeSpecialCharsRegExp(x,1);
      let RegExpToMatch=new RegExp(`^${x}.*$`,'gi');
      if((userAnsValue.match(/^\s\.\./g))){
        thisElement.value='';
        dv2_transparent("keyboard");
      }else if(realStringInDB.match(RegExpToMatch)){
        // WE NEED TO DO THIS BECAUSE THE PARENTHESES ARE CAUSING PROBLEMS IN MATCH METHOD
        x=escapeSpecialCharsRegExp(x,2);
        let userAnsLength=x.length;
        if(userAnsLength>0){
          let lastPart=stringWithAsterisks.slice(userAnsLength);
          realStringInDB=escapeSpecialCharsRegExp(realStringInDB,2);
          let firstPart=realStringInDB.slice(0,userAnsLength);
          document.getElementById("dv2-transparent-text").innerHTML=firstPart+lastPart;
        }
      }
    }
  }
}

function escapeSpecialCharsRegExp(a,b){
    if(b===1){
      a=a.replace(/\(/g,"<<<");
      a=a.replace(/\)/g,">>>");
      a=a.replace(/\[/g,"Â¨01Â¨");
      a=a.replace(/\]/g,"Â¨02Â¨");
      a=a.replace(/\'/g,"Â¨03Â¨");
      a=a.replace(/\//g,"Â¨04Â¨");
      a=a.replace(/\\/g,"Â¨05Â¨");
      a=a.replace(/\$/g,"Â¨06Â¨");
      a=a.replace(/\^/g,"Â¨07Â¨");
      a=a.replace(/\./g,"Â¨08Â¨");
      a=a.replace(/\|/g,"Â¨08Â¨");
      a=a.replace(/\?/g,"Â¨10Â¨");
      a=a.replace(/\*/g,"Â¨11Â¨");
      a=a.replace(/\+/g,"Â¨12Â¨");
      a=a.replace(/\{/g,"Â¨13Â¨");
      a=a.replace(/\}/g,"Â¨14Â¨");
      return a;
    }else if(b===2){
      a=a.replace(/<<</g,"(");
      a=a.replace(/>>>/g,")");
      a=a.replace(/Â¨01Â¨/g,"[");
      a=a.replace(/Â¨02Â¨/g,"]");
      a=a.replace(/Â¨03Â¨/g,"'");
      a=a.replace(/Â¨04Â¨/g,"/");
      a=a.replace(/Â¨05Â¨/g,"\\");
      a=a.replace(/Â¨06Â¨/g,"$");
      a=a.replace(/Â¨07Â¨/g,"^");
      a=a.replace(/Â¨08Â¨/g,".");
      a=a.replace(/Â¨09Â¨/g,"|");
      a=a.replace(/Â¨10Â¨/g,"?");
      a=a.replace(/Â¨11Â¨/g,"*");
      a=a.replace(/Â¨12Â¨/g,"+");
      a=a.replace(/Â¨13Â¨/g,"{");
      a=a.replace(/Â¨14Â¨/g,"}");
      return a;
    }
}

// HANGMAN //
//
var hmGameIndex=0;
var hmFindingLetter=false;
var hmCorrectLetters=0;
var hmWrongLetters=0;
var hmImageBackground=0;
var hmDvLetterAnswer=document.getElementsByClassName("hm-dv-letter-answer");
var hmScore=0;
var hmAllLettersCorrect=true;

var hmImagesArray=['hm-0.png','hm-1.png','hm-2.png','hm-3.png','hm-4.png','hm-5.png','hm-6.png','hm-7.png','hm-8.png'];
var hmImagesArray2=[];

for(i=0;i<hmImagesArray.length;i++){
  hmImagesArray2[i]=new Image();
  hmImagesArray2[i].src='images/'+hmImagesArray[i];
}

function hmPlayAgainBtn(a=1){
  if((a==2)&&(varB_rW2[0]=="#")){
    varA_rW=[];
    varB_rW=[];
    varA=[...varA_rW2];
    varB=[...varB_rW2];
    randomWords_ForLoop();
    //hmIncreasingArray=true;
    onlyForRandomWordsGameHashtagAnswers=true;
  }
  if((a===2)&&((varB_rW2[0]=="#")||(varB_rW2[0].match(/^\d+$/)))){
    hmIncreasingArray=true;
  }
  hmGameIndex=0;
  hmFindingLetter=false;
  hmCorrectLetters=0;
  hmWrongLetters=0;
  hmImageBackground=0;
  hmScore=0;
  hmStudyIndex=0;
  hmAllLettersCorrect=true;
  hmFinishDiv.style.display="none";
  hmMainTwo.style.display="block";
  hmInfoScore[1].setAttribute('class','hm-info-hmScore');
  hmClearButtonsToNextIndexGame();
  hmStartingGame();
}

function hmReturnHangman(){
  hmStudyHereHm.style.display="none";
  hmPlayAgainBtn();
  event.stopPropagation();
}

function hmAlphabetKey(x){
  var hmUserClickLetter;

  // REMOVING BLINK TEXT AFTER USER CLICK ON KEYBOARD //
  var hmQuestionSpan=document.getElementsByClassName('hm-question-span')[0];
  hmQuestionSpan.setAttribute('class','hm-question-span');

  for(var i=0;i<hmArrayAnswers[hmGameIndex].length;i++){
    if(hmDvLetterAnswer[i].innerHTML=="&nbsp;"){
      hmUserClickLetter=hmArrayAnswers[hmGameIndex].charAt(i).toUpperCase();
      if(x.innerHTML==hmUserClickLetter){
        if((adminUser)&&(varA_rW2[hmGameIndex].match(/^\d+$/))){
          hmDvLetterAnswer[i].innerHTML=varB_rW2[hmGameIndex].charAt(i);
        }else{
          hmDvLetterAnswer[i].innerHTML=hmUserClickLetter;
        }
        //hmDvLetterAnswer[i].innerHTML=hmUserClickLetter;
        hmCorrectLetters++;
        hmFindingLetter=true;
        if(!varA_rW2[0].match(/^\d+$/)){
          x.style.pointerEvents="none";
        }else{
          break;
        }
      }
    }
  }
  if(hmFindingLetter){
    x.style.backgroundColor="limegreen";
    if(varA_rW2[0].match(/^\d+$/)){
      setTimeout(()=>{
        x.style.backgroundColor="mediumslateblue";
      },300);
    }
    if(hmCorrectLetters==hmArrayAnswers[hmGameIndex].length){
      if(hmAllLettersCorrect){
        setTimeout(function(){
          hmFinishIndexGame("c");
        },200);
      }else{
        setTimeout(function(){
          hmFinishIndexGame("p");
        },400);
      }
    }
    hmFindingLetter=false;
  }else{
    hmAllLettersCorrect=false;
    x.style.backgroundColor="red";
    x.style.pointerEvents="none";

    if(hmWrongLetters<7){
      hmWrongLetters++;
      hmImageBackground++;
      hmDvHangman.style.backgroundImage="url('images/hm-"+hmImageBackground+".png')";
    }

    if(hmWrongLetters==7){
      hmDvKeyboard.style.pointerEvents="none";
      setTimeout(function(){
        if(hmCorrectLetters==0){
          hmFinishIndexGame("w");
        }else{
          hmFinishIndexGame("p");
        }
      },1000);
    }
  }
}

function hmShowAnswerBtn(){
  // 20.12.2022 //
  hmMainTwo.style.display="none";
  hmCorrectWrongDiv.style.display="block";

  hmInfo[0].innerHTML='';
  hmInfoString[0].innerHTML='';
  hmInfoIndex[0].innerHTML='';
  hmCorrectWrongDiv.style.backgroundImage="linear-gradient(#98FB98,white)";
  hmScore=0;

  var hmStudyModeIndex=0;

  hmInfoString[0].style.padding='0 20px';

  hmStudyMode();

  function hmStudyMode(){
    var hmStudyModeTimer;
    var hmArrayQuestionsReplace='';
    hmInfoString[0].style.fontFamily='Arial';
    hmInfoString[0].style.fontSize='17px';
    hmInfoString[0].style.lineHeight='27px';
    if(hmStudyModeIndex<hmArrayAnswers.length){
      hmInfoString[0].style.fontFamily='Courier New';
      hmInfoString[0].style.fontSize='30px';
      hmInfoString[0].innerHTML='<span class="hm-blink2">'+hmArrayAnswers[hmStudyModeIndex]+'</span>';
      setTimeout(()=>{
        hmStudyModeIndex++;
        hmStudyMode();
      },1250);
    }else{
      hmInfoString[0].style.fontFamily='Courier New';
      hmInfoString[0].style.fontSize='30px';
      hmInfoString[0].style.textAlign='center';
      hmInfoString[0].style.padding='0';
      hmFinishTotalGame('w');
    }
  }
}

var hmMainTwo=document.getElementsByClassName("hm-main-two")[0];
var hmCorrectWrongDiv=document.getElementsByClassName("hm-correct-wrong-div")[0];
var hmInfo=document.getElementsByClassName("hm-info");
var hmInfoString=document.getElementsByClassName("hm-info-string");
var hmInfoIndex=document.getElementsByClassName("hm-info-index");
var hmInfoScore=document.getElementsByClassName("hm-info-hmScore");

function hmFinishIndexGame(hmCorrectOrWrongAns){
  hmMainTwo.style.display="none";

  hmCorrectWrongDiv.style.display="block";

  // 03.05.2023 //
  if((adminUser)&&(varA_rW2[hmGameIndex].match(/^\d+$/))){
    hmInfoString[0].style.width="auto";
    hmInfoString[0].style.wordWrap="break-word";
    hmInfoString[0].style.fontSize="24px";
  }

  var timeToGoNext=1000;

  if(hmCorrectOrWrongAns=="c"){
    // CORRECT //
    hmScore++;
    hmInfo[0].innerHTML="Very Good!!!";
    hmCorrectWrongDiv.style.backgroundImage="linear-gradient(#98FB98,white)";
    timeToGoNext=750;
  }else if(hmCorrectOrWrongAns=="p"){
    // PARCIALLY CORRECT //
    hmInfo[0].innerHTML="Ok!";
    hmCorrectWrongDiv.style.backgroundImage="linear-gradient(#98FB98,white)";
    timeToGoNext=750;
  }else{
    // WRONG //
    if(hmArrayAnswers[hmGameIndex].length>12){
      hmInfo[0].style.fontSize='28px';
    }else{
      hmInfo[0].style.fontSize='32px';
    }
    if(hmShowOneLetterCounter==hmArrayAnswers[hmGameIndex].length){
      hmCorrectWrongDiv.style.display="none";
      if(screenWidth=window.innerWidth>425){
        timeToGoNext=150;
      }else{
        timeToGoNext=100;
      }
    }else{
      hmInfo[0].innerHTML=hmArrayAnswers[hmGameIndex].toUpperCase();
      hmCorrectWrongDiv.style.backgroundImage="linear-gradient(#98FB98,white)";
    }
  }
  if(timeToGoNext==750){
    //hmInfoString[0].innerHTML='<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMS8xNS8yMqKGNmYAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzbovLKMAAAMM0lEQVRogd2beZQUxR3Hv1V9Tc/MHuyuHLsgCCigeEY8gA3KoeJqIvB8RJNIPKMxGhPQl4MEA5j3onLEI8aoiT41koBoxKggiHiBj3AsGgQF9iEru+yuCztHz0x3V1X+mO3Z7tmZ2dlhILx836s3u9PVVb9P/+pXVV1VQ4QQOJYihJB88oljbAgpdvlpYCQtwfUpXJ/ulPyyyIYVBTQNjgIgExfI1VoJGUUUMowS9CcUfsEBADHO0GzHRUO4SezeuNg+iCQghxeYOwUWA/qoQF2A5MzvELV6jHy6rJFziIRhhKA/CEoAKIQk4TvzCiHAIWADCHMbLczC3vhhvuOzV9nuQztEAl3Q3PX3UQEXBOoGnPSAPEAvp5cTGeMJwUmFGgIAnKHNjmFT6262bsuTrAkAQxfsUQH3GtSBvGSeXBnsR66lMpkEQOttxbkkBEwrig37P2CvfbaStQGw0QXLknl6Z3ivQDshSd1jymVUId8jBGW9qay3EhyhaAt/+Z3f2O8AsJCEdJLoDWxeoI4Xx/2cBvsMlu+kEsYVZnphsgxs3vGi9ZevNosQvMAcyM+7PYI6kFMelGt8pfSXhGLQUVtegJiFrxrWs8d2rmCNSMJa6EVTzgnqQF72kDJYKyW/JQQVRbO8AHEbHfvftxd98hLfDyCBZOw63s0JS3sqfMrv5QEnAiQAUBllg2vl2addRWuQ7AAVAFJnyn1vtguEEDL2XingK6NzTwRIR1RG2alXyHdVjSBlAFQAMpIcNNd0MyOo07tWDJXu/l/FpGGaYNxGJsslFQO+cYt8EwAfvJ4l2WC7gToZ6x5VJlMJFxfP9HwlYCRMNnHI9YcVBGIxy8wIq5WRc8bdJ9ciQxPOBJvRo7W/kvpQldxUROvzEgHQYVhi0rDvGnMuezb4u7p1drnWPxE1M8P2OYVOH3AerUCyCeeMVw+o02TLaqSZhCBQZI6cIgCipolTK0Yb90x8WlMURRk1cEzJkmkf8j5ydSgUN0U6LJXgP30GrUPSqyqSkBQZmnA3j06cL/WlMiYfI56sMpkFFbpx/9RX4NN8qvN9dcVQ/fGZ/yanV11gdMS7e9ZfSS8aNJb2RdKjqY4pvfzUF443/ZXSlUg+neMmLjjiCWHNnfJ3VlM13J9+/aTyASWLpr+rjht0dUfMtLj7GqFQhk2RJqCr+TqwHq96yEfNoCqRUXtMaHKoI2rzG8fMi184vC4AZAxHaJquTB15s7CY4OnXgn3Jeb5y+NAVp9286vnn5PHSSEJQVTSCHkQAhOKmGHfy5ZHrLpirU0qzjuvNh780HtrwA03XJDn9GlVQdtqV0jAkQVNDjSePu15ZIecWB6FnEQCGZWJgYIjxy6nLVFmWuwE4sizLXPDmNBaxj+gKzTwJ6jOUjkSy2cpwdUrOdQqk4pNSGacVDyW3LG5DEpp5f90/UeIv92XLxznnf35/duLT1q3BoKoi22TWV47B6IJMNV8nTlMenbhQrgbQr7cGi6xV574rbHBr9oSn4sP6nZVzGPvg85Wx5Z88qpfpCslVk+wjFUMm0H7I5VEARC0hp4MgmK+pBIBpmyKWsOxsU7Vs97VHLD7z7B/HLh11fbce1q3Gtj3RB9fPkvwakXtaNSUS9L5n0qHwdkap1UfHtYTKcII5L2OjpomRVWONuZOXJ8DluGGZ6GkFlwAIJ0yMqak1bqtd7JOk7h2LI8syzYVvzUCcGz5V6tksQiAHqlCDtKaLzmHGqYhQQvp3rtb1KJNZ0Igen33pc2Rg1XB/VWBQaOHbM0Rr7Cs9VxzFbRPlSlV07tTlsqIoWcdqxhj7w9rbY7vad5SW69nL85KCKn5S2QnnwHZ51MlGKLKOYW4JCEQTwppzybPmwKrhOgCcMejC0qXTNqJaP7UjlMg8L2WcwbJgzrtiJa8o6Ze18wEg1u18MbJq918DPcVluqhC/PA221Sc5uVBR86ke8YZdxi1I2YE4Xow/foM0p+4bos2pnpKuC1scnj8IBCOMXbX+EfiZw2uzdkP7G/ZZSx571YtqFM5j+eeSW5Qz5cAQARHFMjeSpy4HFV1Tvj2by7VJUnq9pACeolvft0qZdroWyIdhsW4YCAk+XDqRn4/evXZP/I8nHQlzIQ5/61psGH6FJo1fLOKWyLmKt+zFZIyljHRLAS6Ta8cWZyhQqs2FtS9IamqmjW+NE3z3TPpT8FZ5/06FI0z+4hhYkTlmdF7Jj7ly/Rwuupn/NH1P0zsPbzLH9DyjEu3BLgZFu3ZLjsVCzuOhs5tgszlCAFN0gQI77G5S5JEZ427v/zeS55O9FEGheZNfZWqqpbzRWHtzueNVZ89p5f6FVLIxoPgYJEW4ezjAGkbVymjwwf5LgCRbAWpkoyWeEPg1r+NFtv2vdvRU8WUUnL56Bv9y27e7auuHJpzvNx36JPokg23KUGdyqSwuIRgMJrr+QGkbV+k7HHybVrCmriNlqwFAfDJKuI44v/FG5P19TuXhRljLFfllFKiqXpOTxqxSPz+N6/hnFpaIXHpyIqJw42bRCu8oCngFCgAwUx8kaswB1ZSuDpv9XXaiq2LY7ZtZ23uPcm2bfvhtTcmDoT3Bf1KAXHpUqwdjfDuzzC4m27noq8AwGNHeH1PBQoAMlVQFpDVxz+8T1+85tZwIbCcc/H69ieia/euCJT6ejdeZlLrZ3wvvJApzwohhMejO1ewzwXH1/kUTAlFeUCR3tjzbPnc166KRYxQrDeGfdG8zXh84098pbpU6HiZEksgtHcN+xIZIJHeGQEQrTuFaUbFh/lWQEBQpqtk04HVwZ+trOVNbQ1ZOzO3orFwYuHqa0EloUlZ3i97o45GscOKpTafnG0KT4dEgdSeBQfAm7fzt4WA2ZuKygMq2dexI3DH8nOx6+DmKOc8a0tkjNmL1s4yGyMNfj37dDdvCQ7783/Zm+GFTHnV2Y/xeBQAr3+etVpR8W6vKhNAUFURR0fw7hUX0/d2rQhly7qq/vHY2r2vFCUuAaDjgNjS8qk4giSkkzJ71G0IALZnDVspePYxNZMEAE1WIatcf+CdmYF/fPxwB2PM00ntPrg59sePfqqV6hI92rgEAG4hVv+C/R6ScJYrOT1uSumgHADf8xbviBziLxVSuSIp0FRJfuSje/1PvjcnbpqmCQAh43B8/lvTQShX5SLEJQAc3MrWdOwXYXSHdDqjlFKg7mEGgL1+nr3BMrC5EAMkIqEyqCgvbV/qX/DG9PiR8NfRh9bckGgyGnX9KMdLR9EWsXPrM2w7knBmZ7LQdd7Bs/Xv2Qh2VhuQXHdR+p5JysbcrsyTFFQXalDcNlEmV0YidrtfkZVevRZmk2WgdcNC8xmjDREAMQBG52ccXbAeUE/FaV5lLZ+ISMM7bCm3caRQo3yyiihvD8qyXBRIZiK07Vn7JaMNUXR5Mqc3gewv3k5Xbe18mTU1vGsv4jYOF2qcTBUUOln3GGUiVP+C9WLzdt6GJFwcyS1+BzS1zZ+ujGcY0pswAG3kt2nNsMnynZKGmqO2uACZUbTUP28ta9oq2pCEiyPZXBOdKWOTdZT1sIazqI3kIpMCQKscQcrOv0W+QSsj5x8TmiyKNItPP37Mej3akmqucVdyIBlcE4R05XMqxVk6VDuTb+wceXzFUHoNlVFSTKB0MQuRpm1s3danPb2rG9CJTw6A5TqVktfxG3TBKkhuumrV55PKUddIU/1V9CJCi7vNyBnMUCPf9uky9n773tQhKgcqAW9zzeusUd4HquCFVZD0rjZkAu0/ZII0NnASOVfSUHk0gHYc7aFG/p89q/mW5nre3gmQDul0PMU7UJXK1AXrXhx2A6taCXwjviUNLx9CT9P74GTZRyqJBD8hkEFAnRI6BzAuOJhgMExDtMe+RmPb57xh72q2P+0txAFyDyHH5ohcBmCnk3I2c5ye2UkyAPmUS2m/vmfQofpJpFrVRRVVaAAAuMUNM0LaI4d406Ed4ssDG7l7+cMBcCbn7qmd7bqWcawsGqgLFvDubzjQCrwPIH0fxHNA2QXoQNppn27vHr9jrKmbXAeT0yCktETRHdatdE+6/05fLTi+B5M9N3cHTgd3P4D0HxG4113TgTKu5B33o+bdCun+ywj33qT7ATjXga73xXQgDxxwAvx4IGOB/88/B8lZwQnyA5//ArdJ2mZhZAkSAAAAAElFTkSuQmCC">'
    if((adminUser)&&(varA_rW2[hmGameIndex].match(/^\d+$/))){
      hmInfoString[0].innerHTML="";
    }else{
      hmInfoString[0].innerHTML=hmArrayAnswers[hmGameIndex].toUpperCase();
    }
  }else{
    if((adminUser)&&(varA_rW2[hmGameIndex].match(/^\d+$/))){
      hmInfoString[0].innerHTML="";
    }else{
      hmInfoString[0].innerHTML=hmArrayAnswers[hmGameIndex];
    }
  }
  hmInfoIndex[0].innerHTML='score: '+hmScore+' / '+hmArrayAnswers.length;

  setTimeout(()=>{
    document.body.style.backgroundColor='white';
    if(hmGameIndex+1==hmArrayAnswers.length){
      // FINISHING HANGAMN GAME //
      hmFinishTotalGame(hmCorrectOrWrongAns);
      return;
    }else{
      // NEXT WORD //
      hmNextIndexGame();
      if(!hmLetterAnswerHiddenBool){
        hmLetterAnswerHiddenBool=true;
        hmLetterAnswerHidden();
      }
    }
  },timeToGoNext);
}

var hmFinishDiv=document.getElementsByClassName("hm-finish-div")[0];

function hmFinishTotalGame(hmCorrectOrWrongAns){
  hmFinishDiv.style.display="block";
  hmInfoScore[1].style.top="127px";//120px
  hmInfo[1].style.top="70px";
  hmInfoString[1].style.display="none";
  hmCorrectWrongDiv.style.display="none";
  hmInfoScore[1].setAttribute('class','hm-info-hmScore hm-finish-blink');

  if(hmCorrectOrWrongAns=="c"){
    hmFinishDiv.style.backgroundImage="linear-gradient(#98FB98,white)";
  }else{
    hmFinishDiv.style.backgroundImage="linear-gradient(#98FB98,white)";
  }
  hmInfoString[1].innerHTML=hmArrayAnswers[hmGameIndex];
  hmInfoScore[1].innerHTML="Score: "+hmScore;
  if(hmScore==hmArrayAnswers.length){
    if(getIdParam==='i'){
      gameIdToDB(getCatParam+getGameNumber,'hangman');
    }
  }
}

function gameIdToDB(gameId,gameType){
  if(window.location.href.indexOf('&id=i&customString=') > -1){
    gameId=gameId+'p';
  }
  $.ajax({
    url:'../game_id_to_db.php?game_id='+gameId+'&game_type='+gameType,
    success:function(){
      console.log('success: '+gameId+' '+gameType);
    }
  });
}

//var hmArrayQuestions=[...varA];

//var hmArrayAnswers=[...varB];

// 16.04.2023 //
var hmArrayQuestions=[];
var hmArrayAnswers=[];

var hmMainOne=document.getElementsByClassName("hm-main-one")[0];
var hmDvHangman=document.getElementsByClassName("hm-dv-hangman")[0];
var hmDvQuestion=document.getElementsByClassName("hm-dv-question")[0];
var hmTitleStart=document.getElementsByClassName("hm-start-title")[0];
var hmDvStart=document.getElementsByClassName("hm-dv-start")[0];
var hmDvKeyboard=document.getElementsByClassName("hm-dv-keyboard")[0];
var hmSeeList=document.getElementsByClassName("hm-see-list")[0];
var hmLetterG=document.getElementById("hm-letter-g");
var hmLetterM=document.getElementById("hm-letter-m");

if(openCustomDiv){
  hmMainOne.style.display='none';
}else{
  hmMainOne.style.display='block';
}

// 01.01.2023 //
var hmIncreasingArray=true;
var onlyForRandomWordsGameHashtagAnswers=true;

function hmStartingGame(){
  savingGameInLastGamesMenu();
  if(varB_rW2[0].match(/^\d+$/)){
    game5_studyModeChooseGameFc();
    return;
  }
  // 16.04.2023 //
  if((onlyForRandomWordsGameHashtagAnswers)||(varB_rW2[0].match(/^\d+$/))){
    if(hmIncreasingArray){
      hmArrayQuestions=[...varA];
      hmArrayAnswers=[...varB];
    }else{
      hmArrayQuestions=[...hmArrayQuestionsAux2];
      hmArrayAnswers=[...hmArrayAnswersAux2];
    }
  }
  // 01.01.2023 //
  if(hmIncreasingArray){
    if((!varA_rW2[0].match(/^\d+$/))&&(!varB_rW2[0].match(/^\d+$/))){
      hmShufflingArrays();
    }else{
      hmStartingGame2();
    }
  }else{
    hmStartingGame2();
  }
  if((adminUser)&&(varA_rW2[hmGameIndex].match(/^\d+$/))){
    document.getElementById("private-game-hm-show-ans-btn").style.display="block";
    document.getElementById("private-game-hm-letter-answer-hidden").style.display="block";
  }
}

function showAnsInAlert(){
  alert(varB_rW2[hmGameIndex]);
}

var hmLetterAnswerHiddenBool=true;

function hmLetterAnswerHidden(){
  if(hmLetterAnswerHiddenBool){
    for(var i=0;i<hmDvLetterAnswer.length;i++){
      hmDvLetterAnswer[i].style.visibility="hidden";
    }
    hmLetterAnswerHiddenBool=false;
  }else{
    for(var i=0;i<hmDvLetterAnswer.length;i++){
      hmDvLetterAnswer[i].style.visibility="visible";
    }
    hmLetterAnswerHiddenBool=true;
  }
}

var hmArrayQuestionsAux;
var hmArrayAnswersAux2;
var hmArrayQuestionsAux2;
var hmStudyModeBlink=true;

function hmStartingGame2(){
  // 01.01.2023 //
  if(hmIncreasingArray){
    varA=hmArrayQuestions;
    varB=hmArrayAnswers;
  }

  if((gameUrlNumber >= 200000)&&(gameUrlNumber<300000)){
    //if(hmIncreasingArray){
      hmArrayQuestionsAux=varA;
      hmArrayAnswers=[...varB,...varA];
      hmArrayQuestions=[...hmArrayQuestionsAux,...varB];
    //}
  }

  // 02.01.2023 //
  if(hmIncreasingArray){
    hmArrayAnswersAux2=[...hmArrayAnswers];
    hmArrayQuestionsAux2=[...hmArrayQuestions];

    for(let i=0;i<hmArrayAnswers.length;i++){
      hmArrayAnswers[i]=hmArrayAnswers[i].replace(/<.*?>.*?<\/.*?>/gi,'').trim();
      hmArrayQuestions[i]=hmArrayQuestions[i].replace(/<.*?>.*?<\/.*?>/gi,'').trim();
    }
    hmIncreasingArray=false;
  }
  // 02.01.2023 //
  // 01.01.2023 //

  hmImageBackground++;
  hmDvHangman.style.backgroundImage="url('images/hm-"+hmImageBackground+".png')";
  hmDvHangman.setAttribute('onclick','hmShowOneLetter()');
  hmTitleStart.style.display="none";
  hmDvStart.style.display="none";
  hmSeeList.style.display="block";
  hmLetterG.style.backgroundColor="mediumslateblue";
  hmLetterM.style.backgroundColor="mediumslateblue";
  if(hmStudyModeBlink){
    hmDvQuestion.innerHTML="<span class='hm-question-span'>"+hmArrayQuestionsAux2[hmGameIndex]+"</span><div id='study-mode-btn' class='hm-see-list-show-answer hm-study-here study_mode_blink' onclick='game5_studyModeChooseGameFc();event.stopPropagation();'>&#9679; Study Mode</div>";
    hmStudyModeBlink=false;
  }else{
    hmDvQuestion.innerHTML="<span class='hm-question-span'>"+hmArrayQuestionsAux2[hmGameIndex]+"</span><div id='study-mode-btn' class='hm-see-list-show-answer hm-study-here' onclick='game5_studyModeChooseGameFc();event.stopPropagation();'>&#9679; Study Mode</div>";
  }
  hmDvKeyboard.style.pointerEvents="auto";

  /*if(varB_rW2[0]=="#"){
    document.getElementById("study-mode-btn").setAttribute("onclick","openDivStudy3();event.stopPropagation()");
  }*/

  var hmQuestionSpan=document.getElementsByClassName("hm-question-span")[0];

  if(hmArrayQuestions[hmGameIndex].length<=12){
    hmQuestionSpan.style.color='#555';
  }

  if(hmArrayQuestions[hmGameIndex].length<=20){
    hmQuestionSpan.style.textAlign='center';
  }

  hmQuestionSpan.style.lineHeight='24px';

  if(hmArrayQuestions[hmGameIndex].length<=8){
    hmQuestionSpan.style.fontSize='30px';
  }else if(hmArrayQuestions[hmGameIndex].length<=12){
    hmQuestionSpan.style.fontSize='25px';
  }else if(hmArrayQuestions[hmGameIndex].length<=15){
    hmQuestionSpan.style.fontSize='20px';/*18px*/
  }else if(hmArrayQuestions[hmGameIndex].length<=40){
    hmQuestionSpan.style.fontSize='19px';/*17px*/
  }else if(hmArrayQuestions[hmGameIndex].length<=60){
    hmQuestionSpan.style.fontSize='18px';/*16px*/
  }else if(hmArrayQuestions[hmGameIndex].length<=80){
    hmQuestionSpan.style.fontSize='17px';/*15px*/
  }else if(hmArrayQuestions[hmGameIndex].length<=90){
    hmQuestionSpan.style.fontSize='16px';/*14px*/
  }else if(hmArrayQuestions[hmGameIndex].length<=100){
    hmQuestionSpan.style.fontSize='15px';/*14px*/
  }else{
    hmQuestionSpan.style.fontSize='14px';/*13px*/
    hmQuestionSpan.style.lineHeight='23px';
  }
  hmPreparingLettersBox();
}

function hmShufflingArrays(){
  function hmShuffle(a,b){
    let x=a.length,t1,r1;
    let y=b.length,t2,r2;

    while(0!==x){
      r1=r2=Math.floor(Math.random()*x);
      x=y-=1;

      t1=a[x];
      t2=b[y];

      a[x]=a[r1];
      b[y]=b[r2];

      a[r1]=t1;
      b[r2]=t2;
    }
    return [a,b];
  }
  hmShuffle(hmArrayQuestions,hmArrayAnswers);
  hmStartingGame2();
}

function hmNextIndexGame(){
  hmAllLettersCorrect=true;
  hmImageBackground=0;
  hmCorrectLetters=0;
  hmWrongLetters=0;
  hmGameIndex++;
  hmCorrectWrongDiv.style.display="none";
  hmMainTwo.style.display="block";
  hmClearButtonsToNextIndexGame();
  hmStartingGame2();
}

var hmDvButton=document.getElementsByClassName("hm-dv-button");

function hmClearButtonsToNextIndexGame(){
  for(var i=0;i<hmDvButton.length;i++){
    hmDvButton[i].style.backgroundColor="mediumslateblue";
    hmDvButton[i].style.pointerEvents="auto";
  }
}

var hmStudyHereHm=document.getElementsByClassName("hm-dv-study-here")[0];
var hmDvStudyHereTable=document.getElementsByClassName("hm-dv-study-here-table")[0];
var hmStudyIndex=0;

function hmPreparingStudyHereTable(){
  hmMainTwo.style.display="none";
  hmStudyHereHm.style.display="block";
  hmStudyHereHm.innerHTML=hmArrayQuestions[hmStudyIndex]+"<br><br><span style='color:red;display:block;text-align:center'>"+hmArrayAnswers[hmStudyIndex].toUpperCase()+"</span><input type='button' class='hm-info-next hm-study-next' onclick='hmStudyNext()' value='Next'><a id='hm-return-hangman-btn' onclick='hmReturnHangman()'>Return Hangman</a>";
}

function hmStudyNext(){
  hmStudyIndex++;
  if(hmStudyIndex==hmArrayAnswers.length){
    hmReturnHangman();
  }else{
    hmPreparingStudyHereTable();
    event.stopPropagation();
  }
}

var hmDvStudyHere=document.getElementsByClassName("hm-dv-study-here")[0];

function hmCloseDvStudy(){
  hmDvStudyHere.style.display="none";
  hmMainTwo.style.display="block";
  hmPlayAgainBtn();
}

var hmDvAnswer=document.getElementsByClassName("hm-dv-answer")[0];

function hmPreparingLettersBox(){
  hmDvAnswer.innerHTML="";

  if(hmArrayAnswers[hmGameIndex].length<8){
    for(var i=0;i<hmArrayAnswers[hmGameIndex].length;i++){
      hmDvAnswer.innerHTML+='<div class="hm-dv-letter-answer">&nbsp;</div>';
      hmDvLetterAnswer[i].style.margin="6px";
      if((hmArrayAnswers[hmGameIndex][i]=='Â ')||(hmArrayAnswers[hmGameIndex][i]==' ')){
        hmDvLetterAnswer[i].style.margin='0';
        hmDvLetterAnswer[i].style.borderBottom='2px solid white';
        hmCorrectLetters++;
      }
      // 31.12.2022 //
      else if(hmArrayAnswers[hmGameIndex][i].match(/[^a-z]/gi)){
        hmDvLetterAnswer[i].innerHTML=hmArrayAnswers[hmGameIndex][i].toUpperCase();
        hmCorrectLetters++;
        // 06.01.2023 //
        if(hmCorrectLetters==hmArrayAnswers[hmGameIndex].length){
          hmFinishIndexGame('c');
        }
        // 06.01.2023 //
      }
      // 31.12.2022 //
    }
  }else{
    for(var i=0;i<hmArrayAnswers[hmGameIndex].length;i++){
      hmDvAnswer.innerHTML+='<div class="hm-dv-letter-answer">&nbsp;</div>';
      if(hmArrayAnswers[hmGameIndex].length==8){
        hmDvLetterAnswer[i].style.width='23px';
        hmDvLetterAnswer[i].style.margin='5px';
        hmDvLetterAnswer[i].style.fontSize='26px';
        hmDvLetterAnswer[i].style.top='17px';
      }else if(hmArrayAnswers[hmGameIndex].length==9){
        hmDvLetterAnswer[i].style.width='22px';
        hmDvLetterAnswer[i].style.margin='4px';
        hmDvLetterAnswer[i].style.fontSize='27px';
        hmDvLetterAnswer[i].style.top='16px';
      }else if(hmArrayAnswers[hmGameIndex].length==10){
        hmDvLetterAnswer[i].style.width='22px';
        hmDvLetterAnswer[i].style.margin='3px';
        hmDvLetterAnswer[i].style.fontSize='25px';
        hmDvLetterAnswer[i].style.top='18px';
      }else if(hmArrayAnswers[hmGameIndex].length==11){
        hmDvLetterAnswer[i].style.width='20px';
        hmDvLetterAnswer[i].style.margin='3px';
        hmDvLetterAnswer[i].style.fontSize='27px';
        hmDvLetterAnswer[i].style.top='18px';
      }else if(hmArrayAnswers[hmGameIndex].length==12){
        hmDvLetterAnswer[i].style.width='19px';
        hmDvLetterAnswer[i].style.margin='2px';
        hmDvLetterAnswer[i].style.fontSize='27px';
        hmDvLetterAnswer[i].style.top='19px';
      }else if(hmArrayAnswers[hmGameIndex].length==13){
        hmDvLetterAnswer[i].style.width='17px';
        hmDvLetterAnswer[i].style.margin='2px';
        hmDvLetterAnswer[i].style.fontSize='26px';
        hmDvLetterAnswer[i].style.top='19px';
      }else if(hmArrayAnswers[hmGameIndex].length==14){
        hmDvLetterAnswer[i].style.width='16px';
        hmDvLetterAnswer[i].style.margin='2px';
        hmDvLetterAnswer[i].style.fontSize='23px';
        hmDvLetterAnswer[i].style.top='19px';
      }else if(hmArrayAnswers[hmGameIndex].length==15){
        hmDvLetterAnswer[i].style.width='15px';
        hmDvLetterAnswer[i].style.margin='2px';
        hmDvLetterAnswer[i].style.fontSize='22px';
        hmDvLetterAnswer[i].style.top='19px';
      }else{
        // PRIVATE GAMES //
        hmDvLetterAnswer[i].style.width='12px';
        hmDvLetterAnswer[i].style.margin='1px';
        hmDvLetterAnswer[i].style.fontSize='15px';
        hmDvLetterAnswer[i].style.top='0px';
        hmDvLetterAnswer[i].style.height='17px';
        hmDvLetterAnswer[i].style.lineHeight='22px';
        hmDvLetterAnswer[i].style.borderBottom='1px solid black';
      }
      if((hmArrayAnswers[hmGameIndex][i]=='Â ')||(hmArrayAnswers[hmGameIndex][i]==' ')){
        hmDvLetterAnswer[i].style.margin='0';
        hmDvLetterAnswer[i].style.borderBottom='2px solid white';
        hmCorrectLetters++;
      }
      // 31.12.2022 //
      else if(hmArrayAnswers[hmGameIndex][i].match(/[^a-z]/gi)){
        hmDvLetterAnswer[i].innerHTML=hmArrayAnswers[hmGameIndex][i].toUpperCase();
        hmCorrectLetters++;
      }
      // 31.12.2022 //
    }
  }
}

var hmShowOneLetterCounter=0;

function hmShowOneLetter(){
  hmAllLettersCorrect=false;
  if(hmShowOneLetterCounter<hmArrayAnswers[hmGameIndex].length){
    hmShowOneLetterCounter++;
  }
  for(var i=0;i<hmArrayAnswers[hmGameIndex].length;i++){
    if((hmDvLetterAnswer[i].innerHTML=='&nbsp;')&&(hmArrayAnswers[hmGameIndex][i]!='Â ')&&(hmArrayAnswers[hmGameIndex][i]!=' ')){
      // 03.05.2023 //
      if((adminUser)&&(varA_rW2[hmGameIndex].match(/^\d+$/))){
        hmDvLetterAnswer[i].innerHTML=hmArrayAnswers[hmGameIndex].charAt(i);
      }else{
        hmDvLetterAnswer[i].innerHTML=hmArrayAnswers[hmGameIndex].charAt(i).toUpperCase();
      }
      //hmDvLetterAnswer[i].innerHTML=hmArrayAnswers[hmGameIndex].charAt(i).toUpperCase();
      hmCorrectLetters++;
      if(hmWrongLetters<7){
        hmWrongLetters++;
        hmImageBackground++;
        hmDvHangman.style.backgroundImage="url('images/hm-"+hmImageBackground+".png')";
      }
      // DONT DELETE THE LINE BELOW AFTER PRACTICE WITH WORDS WITH 8 OR MORE LETTERS //
      //if((hmWrongLetters==7)||(i+1==hmArrayAnswers[hmGameIndex].length)||(hmCorrectLetters==hmArrayAnswers[hmGameIndex].length)){
      if((i+1==hmArrayAnswers[hmGameIndex].length)||(hmCorrectLetters==hmArrayAnswers[hmGameIndex].length)){
        setTimeout(function(){
          if(hmShowOneLetterCounter==hmArrayAnswers[hmGameIndex].length){
            hmFinishIndexGame("w");
          }else{
            hmFinishIndexGame("p");
          }
          hmShowOneLetterCounter=0;
        },1000);
      }else{
        return;
      }
    }
  }
}

// BLINKING ALL GAMES WHEN REFRESH PAGE //
/*if(window.innerWidth>=750){
  $(window).on('load',function(){
    setTimeout(() => {
      allLevelsResp();
    },800);
  });
}*/

// SHOW MENU RIGHT ONLY WHEN EVERYTHING IS LOADED //
/*$(window).on('load',function(){
  document.getElementById('menu-right').style.visibility='visible';
});*/

// PREVENTING BLINK FIRST CLICK //
//returnToGameResp();
//

// PREVENTING BLINK WHEN MOBILE, MOBILE DONT HAVE ALL GAMES BLINK //
if(window.innerWidth<750){
  returnToGameResp();
}
//
// HANGMAN //

function savingGameInLastGamesMenu(){
  if(userIsLoggedJS){
    var gameUrl=window.location.href+";";
    gameUrl=gameUrl.replace("https://teach-and-play.com/","");
    gameUrl=gameUrl.replace(/&/g,'@');
    //if(gameUrl!=='qz/english/?cat=quiz_letters3@num=1@id=i;'){
      $.ajax({
        url:'../user-last-games-info-db.php?game_url='+gameUrl,
      });
    //}
  }
}

var clickOutsideMenuRight=false;

// CLICK OUTSIDE MENU-RIGHT CLOSE //
window.addEventListener('click',function(e){
  if(document.getElementById('menu-right').style.display=='block'){
    if(!clickOutsideMenuRight){
      clickOutsideMenuRight=true;
    }else{
	  screenWidth=window.innerWidth;
      if((!document.getElementById('menu-right').contains(e.target))&&(screenWidth<750)){
        clickOutsideMenuRight=false;
        returnToGameResp();
      }
    }
  }
});

// GAME 4 //
//
function studyModeChooseGame(){
  hmMainTwo.style.display='none';
  document.getElementById('menu-right').style.display='none';
  game4_studyModeChooseGame.style.display='block';
}

var game4_MainIndex;
var game4_VerifyButton=document.getElementById('game4-verify-button');
var game4_DivWithQuestionAndAnswer=document.getElementsByClassName('game4-div-with-question-and-answer')[0];
var game4_InputText=document.getElementById('game4-input-text-value');
var game4_ReturnToQuizButton=document.getElementsByClassName('game4-return-to-quiz-button')[0];
var game4_FinalDiv=document.getElementById('game4-final-div');
var game4_MainDiv=document.getElementsByClassName('game4-main-div')[0];
var game4_studyModeChooseGame=document.getElementById('game4-study-mode-choose-game');
var game4_newStudyGameBool=false;

function game4_newStudyGame(){
  game4_newStudyGameBool=true;
  game4_studyModeChooseGame.style.display='none';
  game5_studyModeChooseGame.style.display='none';
  game4_ReturnToQuizButton.style.display='block';
  game4_MainDiv.style.display='block';
  game4_MainIndex=0
  game4_GameStart();
}

function game4_GameStart(){
  game4_clear();
  game4_DivWithQuestionAndAnswer.innerHTML=varA[game4_MainIndex]+'<span class="game4-red-span">'+varB[game4_MainIndex].replace(/<.*?>.*?<\/.*?>/gi,'')+'</span>';
}

function game4_VerifyButtonFunc(){
  game4_InputText.focus();

  //var game4_GetFirstLetterVarA=varA[game4_MainIndex].replace(/<.*?>.*?<\/.*?>/gi,'');

  var game4_GetFirstLetterVarA=varA[game4_MainIndex];

  if(gameUrlNumber < 200000){
    game4_GetFirstLetterVarA=game4_GetFirstLetterVarA.replace(/ - /g," ");
    game4_GetFirstLetterVarA=game4_GetFirstLetterVarA.replace(/[-.]/g," ");
    game4_GetFirstLetterVarA=game4_GetFirstLetterVarA.replace(/[^a-z ]/gi,"");
    //game4_GetFirstLetterVarA=game4_GetFirstLetterVarA.replace(/(\s?.)(\w+\s?)/g,"$1");
    game4_GetFirstLetterVarA=game4_GetFirstLetterVarA.replace(/(\s?.)(\w+\s?)?/g,"$1");
  }

  game4_GetFirstLetterVarA=game4_GetFirstLetterVarA.replace(/\s+/g,"");

  var game4_GetFirstLetterVarB=varB[game4_MainIndex].replace(/<.*?>.*?<\/.*?>/gi,'');

  // 06.01.2023 //
  //game4_GetFirstLetterVarB=game4_GetFirstLetterVarB.replace(/[^a-z]/gi,"");
  game4_GetFirstLetterVarB=game4_GetFirstLetterVarB.replace(/\s+/g,"");

  var game4_correctAnswer=game4_GetFirstLetterVarA+game4_GetFirstLetterVarB;

  var game4_GetInputTextValue=document.getElementById('game4-input-text-value').value;
  game4_GetInputTextValue=game4_GetInputTextValue.replace(/\s+/g,"");

  if(game4_correctAnswer.toLowerCase().trim()==game4_GetInputTextValue.toLowerCase().trim()){
    game4_MainIndex++;
    game4_DivWithQuestionAndAnswer.innerHTML='correct!';
    game4_DivWithQuestionAndAnswer.setAttribute('class','game4-div-with-question-and-answer game4-correct-div game4-correct-wrong-div');
    setTimeout(()=>{
      game4_DivWithQuestionAndAnswer.setAttribute('class','game4-div-with-question-and-answer');
      if(game4_MainIndex==varA.length){
        game4_GameFinish()
      }else{
        game4_GameStart();
      }
    },800);
  }else{
    game4_DivWithQuestionAndAnswer.innerHTML='incorrect!';
    game4_DivWithQuestionAndAnswer.setAttribute('class','game4-div-with-question-and-answer game4-wrong-div game4-correct-wrong-div');
    setTimeout(()=>{
      game4_DivWithQuestionAndAnswer.setAttribute('class','game4-div-with-question-and-answer');
      game4_GameStart();
    },800);
  }
}

function game4_clear(){
  game4_InputText.value='';
  game4_InputText.focus();
}

function game4_howToPlay(){
  document.getElementById('game4-secondary-div').style.display="none";
  document.getElementById('game4-how-to-play-div').style.display="block";
  document.getElementById('game4-ok-btn-how-to-play').style.display="block";
}

function game4_closeHowToPlay(){
  document.getElementById('game4-secondary-div').style.display="block";
  document.getElementById('game4-how-to-play-div').style.display="none";
  document.getElementById('game4-ok-btn-how-to-play').style.display="none";
  game4_clear();
}

function game4_PlayAgain(){
  game4_newStudyGame();
  game4_FinalDiv.style.display="none";
  game4_ReturnToQuizButton.style.display="block";
}

function game4_GameFinish(){
  game4_MainDiv.style.display="none";
  game4_FinalDiv.style.display="block";
  game4_MainDiv.style.height='310px';
  game4_ReturnToQuizButton.style.display="none";
}
//
// GAME 4 //

// GAME 5 //
//
function game5_studyModeChooseGameFc(){
  hmMainTwo.style.display='none';
  game5_studyModeChooseGame.style.display='block';
  document.getElementById('menu-right').style.display='none';
  // 25.04.2023 //
  //if(varB_rW2[0]=="#"){
  if((varB_rW2[0]=="#")||(varB_rW2[0].match(/^\d+$/))){
    document.getElementById("game5-go-to-game1").setAttribute("onclick","newStudyGame2()");
    nsg2_NextButton.setAttribute('class','nsg2-btn-class menu_right_blink3');
  }
}

var game5_MainIndex;
var game5_DivWithQuestionAndAnswer=document.getElementsByClassName('game5-div-with-question-and-answer')[0];
var game5_FinalDiv=document.getElementById('game5-final-div');
var game5_MainDiv=document.getElementsByClassName('game5-main-div')[0];
var game5_studyModeChooseGame=document.getElementById('game5-study-mode-choose-game');
var game5_varA;
var game5_varB;

function game5_newStudyGame(){
  //document.getElementById('menu-right').style.display='none';
  //game5_studyModeChooseGame.style.display='none';
  //game5_MainDiv.style.display='block';
  //game5_MainIndex=0
  // 30.04.2023 //
  if(varA_rW2[mainIndex].match(/^\d+$/)){
    //game5_varA=[...varB];
    //game5_varB=[...varA];
    newStudyGame2();
  }else{
    document.getElementById('menu-right').style.display='none';
    game5_studyModeChooseGame.style.display='none';
    game5_MainDiv.style.display='block';
    game5_MainIndex=0
    game5_varA=[...varA];
    game5_varB=[...varB];
    game5_GameStart();
  }
  //game5_GameStart();
}

function game5_GameStart(){
  game5_preparingRandomButtons();
}

var correctAnswerButtonPosition;
var verifyIfBtnHaveSameValue_supProblem1;
var verifyIfBtnHaveSameValue_supProblem1b;
var verifyIfBtnHaveSameValue_supProblem2;

function game5_preparingRandomButtons(){
  document.getElementById('game5-btn-id-0').style.backgroundColor='#eee';
  document.getElementById('game5-btn-id-1').style.backgroundColor='#eee';
  if(game5_varA[game5_MainIndex].length<20){
    game5_DivWithQuestionAndAnswer.style.fontSize='24px';
  }else{
    game5_DivWithQuestionAndAnswer.style.fontSize='20px';
  }
  game5_DivWithQuestionAndAnswer.innerHTML=game5_varA[game5_MainIndex];
  correctAnswerButtonPosition=Math.floor(Math.random() * 2);
  verifyIfBtnHaveSameValue_supProblem1=game5_varB[game5_MainIndex].replace(/<.*?>.*?<\/.*?>/gi,'').trim();
  verifyIfBtnHaveSameValue_supProblem1b=verifyIfBtnHaveSameValue_supProblem1.replace(/\s+/,'');
  document.getElementById('game5-btn-id-'+correctAnswerButtonPosition).value=verifyIfBtnHaveSameValue_supProblem1;
  preparingValueSecondButton();
}

function preparingValueSecondButton(){
  let buttonSecondValue=Math.floor(Math.random() * game5_varB.length);
  verifyIfBtnHaveSameValue_supProblem2=game5_varB[buttonSecondValue].replace(/<.*?>.*?<\/.*?>/gi,'').trim();
  var verifyIfBtnHaveSameValue_supProblem2b=verifyIfBtnHaveSameValue_supProblem2.replace(/\s+/,'');
  if((buttonSecondValue==game5_MainIndex)||(verifyIfBtnHaveSameValue_supProblem1b==verifyIfBtnHaveSameValue_supProblem2b)){
    preparingValueSecondButton();
  }else if(correctAnswerButtonPosition===0){
    document.getElementById('game5-btn-id-1').value=verifyIfBtnHaveSameValue_supProblem2;
  }else{
    document.getElementById('game5-btn-id-0').value=verifyIfBtnHaveSameValue_supProblem2;
  }
}

var game5_waitTimerBeforeClick=true;
var game5_timer;

function game5_userClickBtnVerifyAnswer(btnValue,thisBtn){
  if(game5_waitTimerBeforeClick){
    game5_waitTimerBeforeClick=false;
    if(btnValue==verifyIfBtnHaveSameValue_supProblem1){
      // CORRECT //
      thisBtn.style.backgroundColor='lightgreen';
      game5_timer=500;
    }else{
      // INCORRECT //
      thisBtn.style.backgroundColor='pink';
      setTimeout(()=>{
        document.getElementById('game5-btn-id-'+correctAnswerButtonPosition).style.backgroundColor='lightgreen';
      },200);
      game5_timer=1400;
    }
    setTimeout(()=>{
      game5_goToNextQuestion();
      game5_waitTimerBeforeClick=true;
    },game5_timer);
  }
}

function game5_goToNextQuestion(){
  game5_MainIndex++;
  if(game5_MainIndex==game5_varB.length){
    game5_GameFinish();
  }else{
    game5_preparingRandomButtons();
  }
}

function game5_userClickShowAnswer(){
  document.getElementById('game5-btn-id-'+correctAnswerButtonPosition).style.backgroundColor='orange';
  setTimeout(()=>{
    document.getElementById('game5-btn-id-'+correctAnswerButtonPosition).style.backgroundColor='orange';
  },0);
  setTimeout(()=>{
    document.getElementById('game5-btn-id-'+correctAnswerButtonPosition).style.backgroundColor='#eee';
  },200);
  setTimeout(()=>{
    document.getElementById('game5-btn-id-'+correctAnswerButtonPosition).style.backgroundColor='orange';
  },400);
  setTimeout(()=>{
    game5_goToNextQuestion();
  },1600);
}

function game5_PlayAgain(){
  game5_FinalDiv.style.display='none';
  game5_newStudyGame();
}

function game5_GameFinish(){
  game5_MainDiv.style.display='none';
  game5_FinalDiv.style.display='block';
}
//
// GAME 5 //

var showAllGamesMaxIndex;

function showAllGamesNoLoggedUser(){
  const showAllGamesDiv=document.getElementById("show-all-games-no-logged-user");
  document.getElementById("all-games-li").style.display="none";

  const increaseMarginLeftPremiumTag=document.querySelectorAll(".letters"+getCatParam+" > a > .premium-sup");

  for(let i=0;i<=5;i++){
    increaseMarginLeftPremiumTag[i].setAttribute("class","premium-sup premium-sup2")
  }

  let hrefNum=65;

  for(let i=10;i<=showAllGamesMaxIndex;i++){
    hrefNum+=8;
    const gameListItem=document.createElement("li");
    gameListItem.classList.add("all-levels-sub-cat","letters"+getCatParam);
    gameListItem.style.display="block";
    const gameLink=document.createElement("a");
    gameLink.href="?cat=quiz_letters"+getCatParam+"&num="+hrefNum+"&id=i";
    gameLink.innerHTML="&#9679; Game "+i+" <sup class='premium-sup'>premium</sup>";
    gameListItem.appendChild(gameLink);
    showAllGamesDiv.appendChild(gameListItem);
  }
}

var skipThisWords2;

function randomWords_ForLoop(){
  if(localStorage.dontRepeatThisRandomWords){
    skipThisWords2=localStorage.dontRepeatThisRandomWords;
    skipThisWords2=skipThisWords2.split(",");
    if(skipThisWords2.length>60){
      skipThisWords2.splice(-8);
      localStorage.dontRepeatThisRandomWords=skipThisWords2;
    }
    skipThisWords2=skipThisWords2.map(function(item){
      return item.toLowerCase();
    });
  }

  for(randomWords_ForLoopIndex=0;randomWords_ForLoopIndex<varA.length;randomWords_ForLoopIndex++){
    randomWords_Answers();
  }
  varA=varA_rW;
  varB=varB_rW;
  if(localStorage.dontRepeatThisRandomWords){
    localStorage.dontRepeatThisRandomWords+=","+varB_rW;
  }else{
    localStorage.dontRepeatThisRandomWords=varB_rW;
  }
  onlyForRandomWordsGameHashtagAnswers=false;
}

var verifyMatchIndex=0;

if((!localStorage.rw8)||(localStorage.rw8=="")){
  localStorage.rw8="@,";
}

function randomWords_Answers(){
  var skipThisWords=["-","nas","foi","pela","pelas","estÃ£o","da","pode","para","na","ser","Ã©","o","a","pelo","qual","de","partir","como","e","nosso","em","sÃ£o","uma","que","ao","os","podem","ou","no","um","as","do","nos","estÃ£o","com","das","por","dos","Î±","se","suas","tem"];
  let randomWords_GetVarA=varA[randomWords_ForLoopIndex];
  randomWords_GetVarA_splitted=randomWords_GetVarA.split(" ");
  randomWords_RandomIndex=Math.floor(Math.random() * randomWords_GetVarA_splitted.length);
  var randomWords_NewQuestionString="";

  if(localStorage.rw8){
    let rw1=localStorage.rw8;
    let rw2=randomWords_GetVarA;
    let rw3;

    // WE NEED TO DO THIS BECAUSE THE PARENTHESES ARE CAUSING PROBLEMS IN FIND METHOD
    rw1=rw1.replace(/\(/g,"<<<");
    rw1=rw1.replace(/\)/g,">>>");
    // WE NEED TO DO THIS BECAUSE THE PARENTHESES ARE CAUSING PROBLEMS IN FIND METHOD
    rw2=rw2.replace(/\(/g,"<<<");
    rw2=rw2.replace(/\)/g,">>>");

    let rw4=rw1.split("@,");
    rw4.shift();

    if(rw4.length>50){
      // REMOVE FIRST ELEMENT OF THE ARRAY
      rw4.shift();
      // CONVERT ARRAY TO STRING
      rw1="@,"+rw4.join("@,");
    }

    if(rw1.match("@,"+rw2+"##")){
      // HERE HE FOUND THE VARA[I] IN THE MIDDLE OF THE STRING RW1
      rw3=rw4.find(element => element.includes(rw2+"##"));
      // HERE IT TAKES THE QUESTION PLUS THE INDEXES THAT HAVE ALREADY BEEN USED
      rw1=rw1.replace("@,"+rw3,"");
      // HERE IT REMOVES THIS QUESTION AND ITS INDEXES FROM THE MAIN STRING RW1
      let rw5=((rw3).match(/##/g) || []).length;
      if(rw5>=randomWords_GetVarA_splitted.length){
        let rw6=rw3.replace(/##(.*)&/,"");
        // HERE IF THE NUMBER OF ## IS GREATER THAN THE LENGTH OF THE SPLITTED VARA[I]
        // THEN IT REMOVES ALL INDEXES, LEAVING ONLY VARA[I]
        let rw7=rw3.replace(/^(.*?)(##)(\d+?)(.*)$/,"$3");
        // HERE IT GETS THE NUMBER OF THE FIRST INDEX THAT WAS REMOVED
        randomWords_RandomIndex=rw7;
        // WE NEED TO DO THIS BECAUSE THE PARENTHESES ARE CAUSING PROBLEMS IN FIND METHOD
        rw1=rw1.replace(/<<</g,"(");
        rw1=rw1.replace(/>>>/g,")");

        localStorage.rw8=rw1+"@,"+rw6+"##"+rw7+"&";
        // HERE WE PUT THIS TO THE END OF THE MAIN STRING RW1
      }else{
        if(rw3.match("##"+randomWords_RandomIndex+"&")){
          randomWords_Answers();
          return;
        }else{
          // WE NEED TO DO THIS BECAUSE THE PARENTHESES ARE CAUSING PROBLEMS IN FIND METHOD
          rw1=rw1.replace(/<<</g,"(");
          rw1=rw1.replace(/>>>/g,")");

          localStorage.rw8=rw1+"@,"+rw3+"##"+randomWords_RandomIndex+"&";
        }
      }
    }else{
      // HERE HE DIDN'T FIND THE VARA[I] IN THE MIDDLE OF THE STRING
      if(localStorage.rw8=="@,"){
        localStorage.rw8="@,"+rw2+"##"+randomWords_RandomIndex+"&";
      }else{
        // WE NEED TO DO THIS BECAUSE THE PARENTHESES ARE CAUSING PROBLEMS IN FIND METHOD
        rw1=rw1.replace(/<<</g,"(");
        rw1=rw1.replace(/>>>/g,")");

        localStorage.rw8=rw1+"@,"+rw2+"##"+randomWords_RandomIndex+"&";
      }
    }
  }

  randomWords_GetVarA_splitted_lowerCase=randomWords_GetVarA_splitted[randomWords_RandomIndex].toLowerCase();
  randomWords_GetVarA_splitted_lowerCase=randomWords_GetVarA_splitted_lowerCase.replace(/[,:\(\)]/g,"");

  if((skipThisWords.indexOf(randomWords_GetVarA_splitted_lowerCase) > -1)
  ||(randomWords_GetVarA_splitted_lowerCase.length>15)
  ||(!randomWords_GetVarA_splitted_lowerCase.match(/[a-z]/gi))
  ){
    randomWords_Answers();
    return;
  }else{
    let randomWords_GetVarA_splitted_toVarB=randomWords_GetVarA_splitted[randomWords_RandomIndex];
    randomWords_GetVarA_splitted_toVarB=randomWords_GetVarA_splitted_toVarB.replace(/[,:\(\)]/g,"");
    varB_rW.push(randomWords_GetVarA_splitted_toVarB);
    // REMOVING ACCENTUATION FROM SINGLE WORD //
    randomWords_GetVarA=encodeURI(randomWords_GetVarA);
    randomWords_GetVarA=randomWords_GetVarA.replace(/%20/g," ");
    randomWords_GetVarA=randomWords_GetVarA.replace(/%/g,"_@_");
    randomWords_GetVarA_splitted_toVarB=encodeURI(randomWords_GetVarA_splitted_toVarB);
    randomWords_GetVarA_splitted_toVarB=randomWords_GetVarA_splitted_toVarB.replace(/%/g,"_@_");
    var randomWords_NewQuestionString=randomWords_GetVarA.replace(new RegExp("\\b"+randomWords_GetVarA_splitted_toVarB+"\\b","gi"),"___");
    // REMOVING ACCENTUATION FROM SINGLE WORD //
    randomWords_NewQuestionString=randomWords_NewQuestionString.replace(/_@_/g,"%");
    randomWords_NewQuestionString=decodeURI(randomWords_NewQuestionString);
    varA_rW.push(randomWords_NewQuestionString);
    verifyMatchIndex=0;
  }
}
