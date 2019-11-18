const GardenPattern = (function () {

    const pixelMap = {
        0: ' ',
        1: '-',
        2: '|'
    };

    const printPatternHtml = function (array) {
        let html = '<pre>';
        array.forEach(row => {
            row.forEach(column => {
                html += `${pixelMap[column]}`;          
            });
            html += `<br/>`;
        });
        html += '</pre>';
        document.getElementById('pattern').innerHTML = html;
    } 

    const arrayPatternCreator = function (w, h, p, masterArr, counter) {
        
        let topDownStatus = true;
        let leftRightStatus = true;

        // TOP VARS INIT
        const topIndex = counter * ((p/2) + 1);
        const topLength = h - ( ((p/2) + 1) * counter * 2 );
        const topLoopCount = topLength + topIndex;

        // BOTTOM VARS INIT
        const bottomIndex = (h-1) - ( counter * ((p/2) + 1) );
        const bottomLength = topLength;
        const bottomLoopCount = bottomLength + bottomIndex;

        if (topLength > 0) {

            // TOP PATTERN LOOP
            for(let i=topIndex; i<topLoopCount; i++) {
                if (typeof masterArr[topIndex] === 'undefined') {
                    masterArr[topIndex] = []
                }
                if (typeof masterArr[topIndex][i] === 'undefined') {
                    masterArr[topIndex][i] = []
                }
                if(i===topIndex || i === (topLoopCount-1)) {
                    masterArr[topIndex][i] = 2;
                } else {
                    masterArr[topIndex][i] = 1;
                }
            }

            // BOTTOM PATTERN LOOP
            for(let j=bottomIndex; j<bottomLoopCount; j++) {
                if (typeof masterArr[bottomIndex] === 'undefined') {
                    masterArr[bottomIndex] = []
                }
                var bottomElementIndex = j - bottomIndex + ( counter * ((p/2) + 1) );
                if(j === bottomIndex || j === (bottomLoopCount-1)) {
                    masterArr[bottomIndex][bottomElementIndex] = 2;
                } else {
                    masterArr[bottomIndex][bottomElementIndex] = 1;
                }
            }
        } else {
            topDownStatus = false;
        }


        // LEFT VARS INIT
        const leftIndex = counter * ((p/2) + 1);
        const leftLength = w - ( ((p/2) + 1) * counter * 2 );
        const leftLoopCount = leftLength + leftIndex;

        // RIGHT VARS INIT
        const rightIndex = (w-1) - (counter * ((p/2) + 1));
        const rightLength = leftLength;
        const rightLoopCount = rightLength + rightIndex;


        if(leftLength > 0) {
            // LEFT PATTERN LOOP
            for(let i=leftIndex; i<leftLoopCount; i++) {
                if (typeof masterArr[i] === 'undefined') {
                    masterArr[i] = []
                }
                if (typeof masterArr[i][leftIndex] === 'undefined') {
                    masterArr[i][leftIndex] = []
                }
                if (leftIndex % ((p/2) + 1) === 0) {
                    if (i===leftIndex || i === (leftLoopCount-1)) {
                        masterArr[i][leftIndex] = masterArr[i][leftIndex] ? masterArr[i][leftIndex] : 1;
                    } else {
                        masterArr[i][leftIndex] = 2;
                    }
                } else {
                    masterArr[i][leftIndex] = 0;
                }
            }


            // RIGHT PATTERN LOOP
            for(let k=rightIndex; k<rightLoopCount; k++) {
                var rightElementIndex = k - rightIndex + ( counter * ((p/2) + 1) );
                if (typeof masterArr[rightElementIndex] === 'undefined') {
                    masterArr[rightElementIndex] = []
                }
                if (typeof masterArr[rightElementIndex][rightIndex] === 'undefined') {
                    masterArr[rightElementIndex][rightIndex] = []
                }

                if (rightIndex % ((p/2) + 1) === 0) {
                    if (rightElementIndex===rightIndex || rightElementIndex === (rightLoopCount-1)) {
                        masterArr[rightElementIndex][rightIndex] = masterArr[rightElementIndex][rightIndex] ? masterArr[rightElementIndex][rightIndex] : 1;
                    } else {
                        masterArr[rightElementIndex][rightIndex] = 2;
                    }
                } else {
                    masterArr[rightElementIndex][rightIndex] = 2;
                }
            }
        } else {
            leftRightStatus = false;
        }

        if(leftRightStatus || topDownStatus) {
            // Reccursively calling the main creator function
            return arrayPatternCreator(w, h, p, masterArr, counter+1);
        } else {
            return masterArr;
        }
    }

    const draw = function (width, height, padding) {
        
        if (
            width < 20 ||
            width % 2 !== 0 ||
            height < 20 ||
            height % 2 !== 0 ||
            padding %2 !== 0
        ) {
            return alert(`Please enter valid rule 
            \n Width should be even and >=20
            \n Height should be even and >=20
            \n Padding should be even and >=4`);
        }

        let patternArray = arrayPatternCreator(width, height, padding, [], 0); // Calling our recursive function to create pattern.
        patternArray = Array.from(patternArray, u => Array.from(u, v => v || 0))

        console.log('FINAL ARRAY : ', patternArray); // Logging the final pattern

        printPatternHtml(patternArray); // Finally printing pattern on HTML
    }

    const submitValues = function () {

        const height = document.getElementById("height").value;
        const width = document.getElementById("width").value;
        const padding = document.getElementById("padding").value;

        draw(width, height, padding);
    }

    return {
        printPattern: submitValues,
    };
})();
