require(['params/ip', 'params/time', 'params/location', 'params/weather', 'params/generic', 'json!answers.json'], function(IP, Time, Location, Weather, Generic, answers) {
    var params = {
        Generic: Generic,
        IP: IP,
        Weather: Weather,
        Location: Location,
        Time: Time
    };

    var lineModel = {
        module: null,
        method: null,
        options: {
            $answer1: null,
            $answer2: null,
            $answer3: null
        }
    };

    var lines = [];

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

        var answer = params[line.module][line.method]();

        if(line.options.hasOwnProperty(answer)) {
            return line.options[answer];
        }

        throw new Error('Could not match any answers. Answer was: '+answer);
    }

    function putLine(lineContent) {
        console.log(lineContent);
    }

    function start() {
        for(var i = 0; i < lines.length; i++) {
            if(i in lines) {
                putLine(processLine(lines[i]));
            }
        }
    }

    function init() {
        Location.init().then(Weather.init).then(function() {
            IP.init();
            Location.init();
            Time.init();

            makeLines();
            start();
        });
    }

    init();
});