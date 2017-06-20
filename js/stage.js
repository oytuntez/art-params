require(['params/ip', 'params/time', 'params/location', 'params/weather', 'params/generic', 'params/device', 'json!answers.json'], function(IP, Time, Location, Weather, Generic, Device, answers) {
    var canvas,
        fontFamily = 'serif',
        poem,
        params = {
            Generic: Generic,
            IP: IP,
            Weather: Weather,
            Location: Location,
            Time: Time,
            Device: Device
        },
        lineModel = {
            module: null,
            method: null,
            options: {
                $answer1: null,
                $answer2: null,
                $answer3: null
            }
        },
        lines = [],
        poemLines = [];

    function makeLines() {
        for(var i = 0; i < answers.length; i++) {
            lines.push(answers[i]);
        }
    }

    /*function makeLine(module, method, answers) {
        var line = Object.create(lineModel);

        line.module = module;
        line.method = method;
        line.options = answers;

        lines.push(line);

        return line;
    }*/

    function processLine(line) {
        if(!line.module || !line.method) {
            throw Error('Module and method must be defined.');
        }

        var paramAnswer = params[line.module][line.method]();

        if(!line.options.hasOwnProperty(paramAnswer) && !line.options.hasOwnProperty("")) {
            throw new Error('Could not match any answers (#1). Answer was: '+paramAnswer);
        }

        var answerLine;

        if(line.options.hasOwnProperty(paramAnswer)) {
            answerLine = line.options[paramAnswer];
        } else if(line.options.hasOwnProperty("")) {
            answerLine = line.options[""];
        } else {
            throw new Error('Could not match any answers (#2). Answer was: '+paramAnswer);
        }

        if(!answerLine) {
            throw new Error('Could not match any answers (#3). Answer was: '+paramAnswer);
        }

        var canModify = getParamNames(params[line.module][line.method]).length > 0;

        if(canModify) {
            answerLine = params[line.module][line.method](answerLine);
        }

        console.log(answerLine.indexOf('{answer}'));

        if(answerLine.indexOf('{answer}') > -1) {
            answerLine = answerLine.replaceAll('{answer}', paramAnswer);
        }

        return answerLine;
    }

    function putLine(lineContent) {
        poemLines.push(lineContent);
        updatePoem();
    }

    function updatePoem() {
        poem.setText(poemLines.join("\n"));
        canvas.renderAll();
    }

    function start() {
        for(var i = 0; i < lines.length; i++) {
            if(i in lines) {
                putLine(processLine(lines[i]));
            }
        }
    }

    function initialize() {
        canvas = new fabric.Canvas('c', {
            selection: true
        });
        canvas.setBackgroundColor('white');

        var textOptions = {
            color: 'black',
            fill: 'blac',
            left: 0,
            top: 0,
            fontFamily: fontFamily,
            fontSize: 25,
            lineHeight: 1.6,
            selectable: true,
            hoverCursor: 'default',
            moveCursor: 'default',
            hasControls: true,
            hasBorders: true
        };
        poem = new fabric.Text("", textOptions);

        canvas.add(poem);
    }

    function init() {
        initialize();

        Location.init().then(Weather.init).then(function() {
            IP.init();
            Location.init();
            Time.init();
            Device.init();

            makeLines();
            start();
        });
    }

    init();
});