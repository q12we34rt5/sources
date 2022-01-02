function parseElement(html) {
    var htmlContainer = document.createElement('html');
    htmlContainer.innerHTML = html;
    return htmlContainer.childNodes[1].childNodes[0];
}

function makeTetrisElement(board, next1, next2, next3, next4, next5, hold) {
    return parseElement(`\
    <div class="main">\
        <div class="left-div">\
            <div class="title-style">hold</div>\
            <div class="block-style">\
                <div>\
                    <canvas id="${hold}"></canvas>\
                </div>\
            </div>\
        </div>\
        <div class="board-div">\
            <canvas id="${board}"></canvas>\
        </div>\
        <div class="right-div">\
            <div class="title-style">next</div>\
            <div class="block-style">\
                <div>\
                    <canvas id="${next1}"></canvas>\
                </div>\
            </div>\
            <div class="block-style">\
                <div>\
                    <canvas id="${next2}"></canvas>\
                </div>\
            </div>\
            <div class="block-style">\
                <div>\
                    <canvas id="${next3}"></canvas>\
                </div>\
            </div>\
            <div class="block-style">\
                <div>\
                    <canvas id="${next4}"></canvas>\
                </div>\
            </div>\
            <div class="block-style">\
                <div>\
                    <canvas id="${next5}"></canvas>\
                </div>\
            </div>\
        </div>\
    </div>\
    `);
}

function makeTetrisElementWithController(board, next1, next2, next3, next4, next5, hold, reset, start, pause) {
    return parseElement(`
    <div class="main">
        <div class="left-div">
            <div class="title-style">hold</div>
            <div class="block-style">
                <div>
                    <canvas id="${hold}"></canvas>
                </div>
            </div>
            <div class="controller-button-div">
                <button id="${reset}">
                    <i class="fas fa-redo-alt"></i>
                </button>
                <button id="${pause}">
                    <i class="fas fa-pause"></i>
                </button>
                <button id="${start}">
                    <i class="fas fa-play"></i>
                </button>
            </div>
        </div>
        <div class="board-div">
            <canvas id="${board}"></canvas>
        </div>
        <div class="right-div">
            <div class="title-style">next</div>
            <div class="block-style">
                <div>
                    <canvas id="${next1}"></canvas>
                </div>
            </div>
            <div class="block-style">
                <div>
                    <canvas id="${next2}"></canvas>
                </div>
            </div>
            <div class="block-style">
                <div>
                    <canvas id="${next3}"></canvas>
                </div>
            </div>
            <div class="block-style">
                <div>
                    <canvas id="${next4}"></canvas>
                </div>
            </div>
            <div class="block-style">
                <div>
                    <canvas id="${next5}"></canvas>
                </div>
            </div>
        </div>
    </div>
    `);
}

function makeTetrisElementWithControllerEx(name) {
    const
        board = "board",
        next1 = "next1",
        next2 = "next2",
        next3 = "next3",
        next4 = "next4",
        next5 = "next5",
        hold = "hold",
        reset = "reset",
        start = "start",
        pause = "pause";
    var root = parseElement(`
    <div id="${name}" class="main">
        <div class="left-div">
            <div class="title-style">hold</div>
            <div class="block-style">
                <div>
                    <canvas id="${hold}"></canvas>
                </div>
            </div>
            <div class="controller-button-div">
                <button id="${reset}">
                    <i class="fas fa-redo-alt"></i>
                </button>
                <button id="${pause}">
                    <i class="fas fa-pause"></i>
                </button>
                <button id="${start}">
                    <i class="fas fa-play"></i>
                </button>
            </div>
        </div>
        <div class="board-div">
            <canvas id="${board}"></canvas>
        </div>
        <div class="right-div">
            <div class="title-style">next</div>
            <div class="block-style">
                <div>
                    <canvas id="${next1}"></canvas>
                </div>
            </div>
            <div class="block-style">
                <div>
                    <canvas id="${next2}"></canvas>
                </div>
            </div>
            <div class="block-style">
                <div>
                    <canvas id="${next3}"></canvas>
                </div>
            </div>
            <div class="block-style">
                <div>
                    <canvas id="${next4}"></canvas>
                </div>
            </div>
            <div class="block-style">
                <div>
                    <canvas id="${next5}"></canvas>
                </div>
            </div>
        </div>
    </div>
    `);
    var
        elem_board = root.querySelector("#board"),
        elem_next1 = root.querySelector("#next1"),
        elem_next2 = root.querySelector("#next2"),
        elem_next3 = root.querySelector("#next3"),
        elem_next4 = root.querySelector("#next4"),
        elem_next5 = root.querySelector("#next5"),
        elem_hold = root.querySelector("#hold"),
        elem_reset = root.querySelector("#reset"),
        elem_start = root.querySelector("#start"),
        elem_pause = root.querySelector("#pause");
    var elem_list = [elem_board, elem_next1, elem_next2, elem_next3, elem_next4, elem_next5, elem_hold, elem_reset, elem_start, elem_pause];
    elem_list.forEach(elem => elem.id = "");
    return {
        root: root,
        board: elem_board,
        next1: elem_next1,
        next2: elem_next2,
        next3: elem_next3,
        next4: elem_next4,
        next5: elem_next5,
        hold: elem_hold,
        reset: elem_reset,
        start: elem_start,
        pause: elem_pause
    }
}

function getCanvasElement(element) {
    if (typeof (element) == "string") {
        var canvas = null;
        canvas = document.getElementById(element);
        if (canvas == null)
            throw "Element id error: Can not found <canvas id=\"" + element + "\">.";
        else if (canvas.nodeName != "CANVAS")
            throw "Element type error: Id \"" + element + "\" is an " + canvas.nodeName + ", not an canvas.";
        return canvas;
    }
    try {
        if (element.nodeName != "CANVAS")
            throw "Element type error: Input element is an " + element.nodeName + ", not an canvas.";
        else
            return element;
    }
    catch (e) {
        throw "Element type error: The input element is not an Id or an HTML object.";
    }
}

function GetTexture(path) {
    var texture = {
        canvas: document.createElement("canvas"),
        width: 0,
        height: 0,
        ready: false
    };
    var img = new Image();
    img.onload = () => {
        texture.canvas.width = img.width;
        texture.canvas.height = img.height;
        texture.width = img.width / 16;
        texture.height = img.height / 10;
        texture.canvas.getContext("2d").drawImage(img, 0, 0);
        texture.ready = true;
    };
    img.src = path;
    return texture;
}

function CreateView(canvases = {
    board: null,
    next: [null, null, null, null, null],
    hold: null
}, kwargs = {
    block: {
        texture: {
            block: null,
            shadow: null
        },
        width: 16,
        height: 16
    },
    board: {
        sx: 3,
        sy: 3,
        width: 12,
        height: 22
    },
    next: {
        sx: 0,
        sy: 0,
        width: 6,
        height: 6
    },
    hold: {
        sx: 0,
        sy: 0,
        width: 6,
        height: 6
    }
}) {
    var view = {
        block: {
            texture: GetTexture(kwargs.block.texture.block),
            width: kwargs.block.width,
            height: kwargs.block.height
        },
        shadow: {
            texture: GetTexture(kwargs.block.texture.shadow),
            width: kwargs.block.width,
            height: kwargs.block.height
        },
        drawBlock: null,
        board: {
            canvas: canvases.board,
            ctx: canvases.board.getContext("2d"),
            data_buf: Array(kwargs.board.height).fill().map(() => new Uint8Array(kwargs.board.width).map(() => 0xFF)),
            shadow_buf: Array(kwargs.board.height).fill().map(() => new Uint8Array(kwargs.board.width).map(() => 0xFF)),
            sx: kwargs.board.sx,
            sy: kwargs.board.sy,
            width: kwargs.board.width,
            height: kwargs.board.height,
            pasteShadow: null,
            drawedBoundary: false,
            initial: null,
            update: null
        },
        boundaryData: [
            [0x16, 0x1A, 0x1A, 0x1A, 0x1A, 0x1C],
            [0x15, 0x00, 0x00, 0x00, 0x00, 0x15],
            [0x15, 0x00, 0x00, 0x00, 0x00, 0x15],
            [0x15, 0x00, 0x00, 0x00, 0x00, 0x15],
            [0x15, 0x00, 0x00, 0x00, 0x00, 0x15],
            [0x13, 0x1A, 0x1A, 0x1A, 0x1A, 0x19],
        ],
        next: {
            canvases: Array(5).fill().map(() => {
                return {
                    canvas: null,
                    ctx: null,
                    type: -1
                };
            }),
            sx: kwargs.next.sx,
            sy: kwargs.next.sy,
            width: kwargs.next.width,
            height: kwargs.next.height,
            boundarySrc: document.createElement("canvas"),
            drawedBoundary: false,
            initial: null,
            update: null
        },
        hold: {
            canvas: null,
            ctx: null,
            type: -1,
            sx: kwargs.hold.sx,
            sy: kwargs.hold.sy,
            width: kwargs.hold.width,
            height: kwargs.hold.height,
            boundarySrc: document.createElement("canvas"),
            drawedBoundary: false,
            initial: null,
            update: null
        }
    };
    // initial view
    view.drawBlock = (ctx, x, y, value) => {
        ctx.drawImage(view.block.texture.canvas, 0, 0,
            view.block.texture.width, view.block.texture.height,
            x * view.block.width, y * view.block.height,
            view.block.width, view.block.height);
        ctx.drawImage(view.block.texture.canvas,
            view.block.texture.width * (value & 0x0F),
            view.block.texture.height * (value >> 4),
            view.block.texture.width, view.block.texture.height,
            x * view.block.width, y * view.block.height,
            view.block.width, view.block.height);
    };
    // initial board
    view.board.pasteShadow = (x, y, value) => {
        view.board.ctx.drawImage(view.shadow.texture.canvas,
            view.shadow.texture.width * (value & 0x0F),
            view.shadow.texture.height * (value >> 4),
            view.shadow.texture.width, view.shadow.texture.height,
            x * view.shadow.width, y * view.shadow.height,
            view.shadow.width, view.shadow.height);
    };
    view.board.initial = () => {
        // set board canvas size
        canvases.board.width = view.board.width * view.block.width;
        canvases.board.height = view.board.height * view.block.height;
    };
    view.board.update = (data, shadow) => {
        if (!view.board.drawedBoundary && view.block.texture.ready) {
            for (var i = 0; i < view.board.height; i++)
                for (var j = 0; j < view.board.width; j++) {
                    view.drawBlock(view.board.ctx, j, i, view.board.data_buf[i][j]);
                    view.board.pasteShadow(j, i, view.board.shadow_buf[i][j]);
                }
            view.board.drawedBoundary = true;
        }
        if (view.block.texture.ready)
            for (var i = 0; i < view.board.height; i++)
                for (var j = 0; j < view.board.width; j++) {
                    const ci = view.board.sy + i, cj = view.board.sx + j;
                    if (view.board.data_buf[i][j] != data[ci][cj]) {
                        view.board.data_buf[i][j] = data[ci][cj];
                        view.drawBlock(view.board.ctx, j, i, view.board.data_buf[i][j]);
                    }
                    if (view.board.shadow_buf[i][j] != shadow[ci][cj] && !data[ci][cj]) {
                        view.board.shadow_buf[i][j] = shadow[ci][cj];
                        view.drawBlock(view.board.ctx, j, i, view.board.data_buf[i][j]);
                        view.board.pasteShadow(j, i, view.board.shadow_buf[i][j]);
                    }
                }
    };
    // initial next
    view.next.initial = () => {
        // set next canvases size
        try {
            view.next.canvases.forEach(value => {
                value.canvas.width = view.next.width * view.block.width;
                value.canvas.height = view.next.height * view.block.height;
            });
            view.next.boundarySrc.width = view.next.width * view.block.width;
            view.next.boundarySrc.height = view.next.height * view.block.height;
        } catch (e) { }
    };
    view.next.update = (queue) => {
        if (!view.next.drawedBoundary && view.block.texture.ready) {
            var ctx = view.next.boundarySrc.getContext("2d");
            for (var i = 0; i < view.next.height; i++)
                for (var j = 0; j < view.next.width; j++) {
                    const ci = view.next.sy + i, cj = view.next.sx + j;
                    view.drawBlock(ctx, j, i, view.boundaryData[ci][cj]);
                }
            view.next.drawedBoundary = true;
        }
        if (view.block.texture.ready)
            for (var k = 0; k < 5; k++) {
                if (view.next.canvases[k].type != queue[k].type) {
                    view.next.canvases[k].type = queue[k].type;
                    view.next.canvases[k].ctx.drawImage(view.next.boundarySrc, 0, 0);
                    for (var i = 0; i < queue[k].height; i++)
                        for (var j = 0; j < queue[k].width; j++)
                            if (queue[k].data[i][j])
                                view.drawBlock(view.next.canvases[k].ctx,
                                    j + 1 - view.next.sx + queue[k].offset_x,
                                    i + 2 - view.next.sy + queue[k].offset_y,
                                    queue[k].data[i][j]);
                }
            }
    };
    for (var i = 0; i < 5; i++) {
        try {
            view.next.canvases[i].canvas = canvases.next[i];
            view.next.canvases[i].ctx = canvases.next[i].getContext("2d");
        }
        catch (e) { }
    }
    // initial hold
    view.hold.canvas = canvases.hold;
    try { view.hold.ctx = canvases.hold.getContext("2d") }
    catch (e) { }
    view.hold.initial = () => {
        try {
            view.hold.canvas.width = view.hold.width * view.block.width;
            view.hold.canvas.height = view.hold.height * view.block.height;
        } catch (e) { }
        view.hold.boundarySrc.width = view.hold.width * view.block.width;
        view.hold.boundarySrc.height = view.hold.height * view.block.height;
    };
    view.hold.update = (block) => {
        if (!view.hold.drawedBoundary && view.block.texture.ready) {
            var ctx = view.hold.boundarySrc.getContext("2d");
            for (var i = 0; i < view.hold.height; i++)
                for (var j = 0; j < view.hold.width; j++) {
                    const ci = view.hold.sy + i, cj = view.hold.sx + j;
                    view.drawBlock(ctx, j, i, view.boundaryData[ci][cj]);
                }
            view.hold.ctx.drawImage(view.hold.boundarySrc, 0, 0);
            view.hold.drawedBoundary = true;
        }
        if (view.block.texture.ready) {
            if (view.hold.type != block.type) {
                view.hold.type = block.type;
                view.hold.ctx.drawImage(view.hold.boundarySrc, 0, 0);
                for (var i = 0; i < block.height; i++)
                    for (var j = 0; j < block.width; j++)
                        if (block.data[i][j])
                            view.drawBlock(view.hold.ctx,
                                j + 1 - view.hold.sx + block.offset_x,
                                i + 2 - view.hold.sy + block.offset_y,
                                block.data[i][j]);
            }
        }
    };
    // initial 
    view.board.initial();
    view.next.initial();
    view.hold.initial();
    return view;
}

function CreateModel(width, height) {
    const sx = 6, sy = 6;
    var model = {
        block: {
            type: {
                Z: 0,
                L: 1,
                O: 2,
                S: 3,
                I: 4,
                J: 5,
                T: 6
            },
            size: [
                { width: 3, height: 3 },
                { width: 3, height: 3 },
                { width: 4, height: 3 },
                { width: 3, height: 3 },
                { width: 4, height: 4 },
                { width: 3, height: 3 },
                { width: 3, height: 3 }
            ],
            data: [
                [
                    [
                        [0x32, 0x3C, 0x00],
                        [0x00, 0x33, 0x38],
                        [0x00, 0x00, 0x00]
                    ],
                    [
                        [0x00, 0x00, 0x34],
                        [0x00, 0x36, 0x39],
                        [0x00, 0x31, 0x00]
                    ],
                    [
                        [0x00, 0x00, 0x00],
                        [0x32, 0x3C, 0x00],
                        [0x00, 0x33, 0x38]
                    ],
                    [
                        [0x00, 0x34, 0x00],
                        [0x36, 0x39, 0x00],
                        [0x31, 0x00, 0x00]
                    ]
                ],
                [
                    [
                        [0x00, 0x00, 0x44],
                        [0x42, 0x4A, 0x49],
                        [0x00, 0x00, 0x00]
                    ],
                    [
                        [0x00, 0x44, 0x00],
                        [0x00, 0x45, 0x00],
                        [0x00, 0x43, 0x48]
                    ],
                    [
                        [0x00, 0x00, 0x00],
                        [0x46, 0x4A, 0x48],
                        [0x41, 0x00, 0x00]
                    ],
                    [
                        [0x42, 0x4C, 0x00],
                        [0x00, 0x45, 0x00],
                        [0x00, 0x41, 0x00]
                    ]
                ],
                [
                    [
                        [0x00, 0x56, 0x5C, 0x00],
                        [0x00, 0x53, 0x59, 0x00],
                        [0x00, 0x00, 0x00, 0x00]
                    ],
                    [
                        [0x00, 0x56, 0x5C, 0x00],
                        [0x00, 0x53, 0x59, 0x00],
                        [0x00, 0x00, 0x00, 0x00]
                    ],
                    [
                        [0x00, 0x56, 0x5C, 0x00],
                        [0x00, 0x53, 0x59, 0x00],
                        [0x00, 0x00, 0x00, 0x00]
                    ],
                    [
                        [0x00, 0x56, 0x5C, 0x00],
                        [0x00, 0x53, 0x59, 0x00],
                        [0x00, 0x00, 0x00, 0x00]
                    ]
                ],
                [
                    [
                        [0x00, 0x66, 0x68],
                        [0x62, 0x69, 0x00],
                        [0x00, 0x00, 0x00]
                    ],
                    [
                        [0x00, 0x64, 0x00],
                        [0x00, 0x63, 0x6C],
                        [0x00, 0x00, 0x61]
                    ],
                    [
                        [0x00, 0x00, 0x00],
                        [0x00, 0x66, 0x68],
                        [0x62, 0x69, 0x00]
                    ],
                    [
                        [0x64, 0x00, 0x00],
                        [0x63, 0x6C, 0x00],
                        [0x00, 0x61, 0x00]
                    ]
                ],
                [
                    [
                        [0x00, 0x00, 0x00, 0x00],
                        [0x72, 0x7A, 0x7A, 0x78],
                        [0x00, 0x00, 0x00, 0x00],
                        [0x00, 0x00, 0x00, 0x00]
                    ],
                    [
                        [0x00, 0x00, 0x74, 0x00],
                        [0x00, 0x00, 0x75, 0x00],
                        [0x00, 0x00, 0x75, 0x00],
                        [0x00, 0x00, 0x71, 0x00]
                    ],
                    [
                        [0x00, 0x00, 0x00, 0x00],
                        [0x00, 0x00, 0x00, 0x00],
                        [0x72, 0x7A, 0x7A, 0x78],
                        [0x00, 0x00, 0x00, 0x00]
                    ],
                    [
                        [0x00, 0x74, 0x00, 0x00],
                        [0x00, 0x75, 0x00, 0x00],
                        [0x00, 0x75, 0x00, 0x00],
                        [0x00, 0x71, 0x00, 0x00]
                    ]
                ],
                [
                    [
                        [0x84, 0x00, 0x00],
                        [0x83, 0x8A, 0x88],
                        [0x00, 0x00, 0x00]
                    ],
                    [
                        [0x00, 0x86, 0x88],
                        [0x00, 0x85, 0x00],
                        [0x00, 0x81, 0x00]
                    ],
                    [
                        [0x00, 0x00, 0x00],
                        [0x82, 0x8A, 0x8C],
                        [0x00, 0x00, 0x81]
                    ],
                    [
                        [0x00, 0x84, 0x00],
                        [0x00, 0x85, 0x00],
                        [0x82, 0x89, 0x00]
                    ]
                ],
                [
                    [
                        [0x00, 0x94, 0x00],
                        [0x92, 0x9B, 0x98],
                        [0x00, 0x00, 0x00]
                    ],
                    [
                        [0x00, 0x94, 0x00],
                        [0x00, 0x97, 0x98],
                        [0x00, 0x91, 0x00]
                    ],
                    [
                        [0x00, 0x00, 0x00],
                        [0x92, 0x9E, 0x98],
                        [0x00, 0x91, 0x00]
                    ],
                    [
                        [0x00, 0x94, 0x00],
                        [0x92, 0x9D, 0x00],
                        [0x00, 0x91, 0x00]
                    ]
                ]
            ],
            centerOffset: [
                [0.5, 0.0],
                [0.5, 0.0],
                [0.0, 0.0],
                [0.5, 0.0],
                [0.0, -0.5],
                [0.5, 0.0],
                [0.5, 0.0]
            ],
            SRS: {
                JLSTZ: [
                    [
                        // 0 >> 1
                        [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
                        // 0 >> 3
                        [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]]
                    ],
                    [
                        // 1 >> 2
                        [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
                        // 1 >> 0
                        [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]]
                    ],
                    [
                        // 2 >> 3
                        [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
                        // 2 >> 1
                        [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]]
                    ],
                    [
                        // 3 >> 0
                        [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
                        // 3 >> 2
                        [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]]
                    ]
                ],
                I: [
                    [
                        // 0 >> 1
                        [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
                        // 0 >> 3
                        [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]]
                    ],
                    [
                        // 1 >> 2
                        [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]],
                        // 1 >> 0
                        [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]]
                    ],
                    [
                        // 2 >> 3
                        [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
                        // 2 >> 1
                        [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]]
                    ],
                    [
                        // 3 >> 0
                        [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
                        // 3 >> 2
                        [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]]
                    ]
                ],
                O: [
                    [
                        // 0 >> 1
                        [[0, 0]],
                        // 0 >> 3
                        [[0, 0]]
                    ],
                    [
                        // 1 >> 2
                        [[0, 0]],
                        // 1 >> 0
                        [[0, 0]]
                    ],
                    [
                        // 2 >> 3
                        [[0, 0]],
                        // 2 >> 1
                        [[0, 0]]
                    ],
                    [
                        // 3 >> 0
                        [[0, 0]],
                        // 3 >> 2
                        [[0, 0]]
                    ]
                ],
                getTests: null
            }
        },
        board: {
            data: Array(height + sy * 2).fill().map(() => new Uint8Array(width + sx * 2)),
            shadow: Array(height + sy * 2).fill().map(() => new Uint8Array(width + sx * 2)),
            clearingBuf: new Uint8Array(height),
            sx: sx,
            sy: sy,
            width: width,
            height: height,
            clear: null,
            pasteBlock: null,
            eraseBlock: null,
            pasteShadow: null,
            eraseShadow: null,
            testCollision: null,
            eraseLine: null,
            shift: null
        },
        next: {
            queue: Array(5).fill().map(() => {
                return {
                    data: null,
                    type: -1,
                    width: 0,
                    height: 0,
                    offset_x: 0,
                    offset_y: 0
                };
            }),
            update: null
        },
        hold: {
            block: {
                data: null,
                type: -1,
                width: 0,
                height: 0,
                offset_x: 0,
                offset_y: 0
            },
            type: null,
            hasHolded: false,
            clear: null,
            holdBlock: null
        },
        controller: {
            x: 0,
            y: 0,
            type: 0,
            rot: 0,
            previousState: {
                reset: () => { model.controller.previousState.x = model.controller.previousState.y = model.controller.previousState.rot = -1; },
                x: -1,
                y: -1,
                rot: -1
            },
            shadow: {
                x: 0,
                y: 0,
                type: 0,
                rot: 0
            },
            blockQueue: null,
            randomArray: null,
            cleanLines: null,
            generateBlock: null,
            getDropPlace: null,
            pasteShadow: null,
            rotateBlock: null,
            key: {
                moveLeft: null,
                moveRigh: null,
                softDrop: null,
                hardDrop: null,
                rotateLeft: null,
                rotateRight: null,
                rotate180: null,
                hold: null
            },
            reset: null,
            update: null
        },
        reset: null,
        update: null
    };
    // initial block
    model.block.SRS.getTests = (type, rot, dir) => {
        if (type == model.block.type.I) return model.block.SRS.I[rot][dir];
        else if (type == model.block.type.O) return model.block.SRS.O[rot][dir];
        return model.block.SRS.JLSTZ[rot][dir];
    };
    // initial board
    model.board.clear = () => {
        for (var i = 0; i < model.board.height; i++)
            for (var j = 0; j < model.board.width; j++)
                model.board.data[i + model.board.sy][j + model.board.sx] = 0x00;
        for (var i = 0; i < model.board.height; i++) {
            model.board.data[i + model.board.sy][model.board.sx - 1] = model.board.data[i + model.board.sy][model.board.width + model.board.sx] = 0x15;
        }
        for (var j = 0; j < model.board.width; j++) {
            model.board.data[model.board.sy - 1][j + model.board.sx] = 0x00;
            model.board.data[model.board.height + model.board.sy][j + model.board.sx] = 0x1A;
        }
        model.board.data[model.board.sy][model.board.sx - 1] = 0x14;
        model.board.data[model.board.sy - 1][model.board.sx - 1] = 0x14;
        model.board.data[model.board.height + model.board.sy][model.board.sx - 1] = 0x13;
        model.board.data[model.board.sy][model.board.width + model.board.sx] = 0x14;
        model.board.data[model.board.sy - 1][model.board.width + model.board.sx] = 0x14;
        model.board.data[model.board.height + model.board.sy][model.board.width + model.board.sx] = 0x19;
        // clear shadow
        for (var i = 0; i < model.board.height + 2 * model.board.sy; i++)
            for (var j = 0; j < model.board.width + 2 * model.board.sx; j++)
                model.board.shadow[i][j] = 0x00;
        // clear clearing buf
        for (var i = 0; i < model.board.height; i++)
            model.board.clearingBuf[i] = 0;
    };
    model.board.pasteBlock = (x, y, type, rot) => {
        for (var i = 0; i < model.block.size[type].height; i++)
            for (var j = 0; j < model.block.size[type].width; j++) {
                const cx = model.board.sx + x + j, cy = model.board.sy + y + i;
                model.board.data[cy][cx] |= model.block.data[type][rot][i][j];
                if (y + i >= 0)
                    model.board.clearingBuf[y + i] += !!model.block.data[type][rot][i][j];
            }
    };
    model.board.eraseBlock = (x, y, type, rot) => {
        for (var i = 0; i < model.block.size[type].height; i++)
            for (var j = 0; j < model.block.size[type].width; j++) {
                const cx = model.board.sx + x + j, cy = model.board.sy + y + i;
                model.board.data[cy][cx] -= model.block.data[type][rot][i][j];
                if (y + i >= 0)
                    model.board.clearingBuf[y + i] -= !!model.block.data[type][rot][i][j];
            }
    };
    model.board.pasteShadow = (x, y, type, rot) => {
        for (var i = 0; i < model.block.size[type].height; i++)
            for (var j = 0; j < model.block.size[type].width; j++) {
                const cx = model.board.sx + x + j, cy = model.board.sy + y + i;
                model.board.shadow[cy][cx] |= model.block.data[type][rot][i][j];
            }
    };
    model.board.eraseShadow = (x, y, type, rot) => {
        for (var i = 0; i < model.block.size[type].height; i++)
            for (var j = 0; j < model.block.size[type].width; j++) {
                const cx = model.board.sx + x + j, cy = model.board.sy + y + i;
                if (model.block.data[type][rot][i][j])
                    model.board.shadow[cy][cx] = 0x00;
            }
    };
    model.board.testCollision = (x, y, type, rot) => {
        var collisionTimes = 0;
        for (var i = 0; i < model.block.size[type].height; i++)
            for (var j = 0; j < model.block.size[type].width; j++) {
                const cx = model.board.sx + x + j, cy = model.board.sy + y + i;
                collisionTimes += !!(model.board.data[cy][cx] && model.block.data[type][rot][i][j]);
            }
        return collisionTimes;
    };
    model.board.eraseLine = (line) => {
        const iline = model.board.sy + line;
        for (var i = 0; i < model.board.width; i++) {
            model.board.data[iline][model.board.sx + i] = 0;
            model.board.data[iline - 1][model.board.sx + i] &= 0xFB;
            model.board.data[iline + 1][model.board.sx + i] &= 0xFE;
        }
        model.board.clearingBuf[line] = 0;
    };
    model.board.shift = (start, dest, lines) => {
        var buf_len = Math.min(start + 1, lines);
        var board_buf = Array(buf_len).fill().map(() => new Uint8Array(model.board.width));
        var clear_buf = new Uint8Array(buf_len);
        for (var i = 0; i < buf_len; i++) {
            for (var j = 0; j < model.board.width; j++) {
                board_buf[buf_len - i - 1][j] = model.board.data[model.board.sy + start - i][model.board.sx + j];
                model.board.data[model.board.sy + start - i][model.board.sx + j] = 0x00;
            }
            clear_buf[buf_len - i - 1] = model.board.clearingBuf[start - i];
            model.board.clearingBuf[start - i] = 0;
        }
        for (var i = 0; i < buf_len; i++) {
            if (dest - i < 0 || dest - i >= model.board.height)
                continue;
            for (var j = 0; j < model.board.width; j++)
                model.board.data[model.board.sy + dest - i][model.board.sx + j] = board_buf[buf_len - i - 1][j];
            model.board.clearingBuf[dest - i] = clear_buf[buf_len - i - 1];
        }
    };
    // initial next
    model.next.update = () => {
        for (var i = 0; i < 5; i++) {
            const type = model.controller.blockQueue[i];
            model.next.queue[i].data = model.block.data[type][0];
            model.next.queue[i].type = type;
            model.next.queue[i].width = model.block.size[type].width;
            model.next.queue[i].height = model.block.size[type].height;
            model.next.queue[i].offset_x = model.block.centerOffset[type][0];
            model.next.queue[i].offset_y = model.block.centerOffset[type][1];
        }
    };
    // initial hold
    model.hold.clear = () => {
        model.hold.block.data = Array(2).fill().map(() => new Uint8Array(4));
        model.hold.block.type = -1;
        model.hold.block.width = 4;
        model.hold.block.height = 2;
        model.hold.hasHolded = false;
    };
    model.hold.holdBlock = () => {
        if (model.hold.hasHolded)
            return false;
        model.board.eraseBlock(model.controller.x, model.controller.y, model.controller.type, model.controller.rot);
        if (model.hold.block.type != -1) {
            model.controller.blockQueue.unshift(model.hold.block.type);
        }
        model.hold.block.type = model.controller.type;
        model.controller.generateBlock();
        model.hold.hasHolded = true;
        model.hold.block.data = model.block.data[model.hold.block.type][0];
        model.hold.block.width = model.block.size[model.hold.block.type].width;
        model.hold.block.height = model.block.size[model.hold.block.type].height;
        model.hold.block.offset_x = model.block.centerOffset[model.hold.block.type][0];
        model.hold.block.offset_y = model.block.centerOffset[model.hold.block.type][1];
        return true;
    };
    // initial controller
    model.controller.randomArray = (src = [0, 1, 2, 3, 4, 5, 6]) => {
        for (var i = 0; i < src.length; i++) {
            var ri = Math.floor(Math.random() * src.length);
            src[ri] = [src[i], src[i] = src[ri]][0];
        }
        return src;
    };
    model.controller.cleanLines = () => {
        for (var i = model.board.height - 1; i >= 0;) {
            if (model.board.clearingBuf[i] == model.board.width) {
                model.board.eraseLine(i);
                model.board.shift(i - 1, i, model.board.height);
            }
            else
                i--;
        }
    };
    model.controller.generateBlock = () => {
        model.controller.cleanLines();
        // set new block property
        const type = model.controller.blockQueue.shift();
        model.controller.x = Math.floor((model.board.width - model.block.size[type].width) / 2);
        model.controller.y = -1;
        model.controller.type = type;
        model.controller.rot = 0;
        // test if generate block failed
        if (model.board.testCollision(model.controller.x, model.controller.y, model.controller.type, model.controller.rot)) {
            model.controller.blockQueue.unshift(type);
            return false;
        }
        // set previous state
        model.controller.previousState.reset();
        // add new blocks to queue
        if (model.controller.blockQueue.length < 14)
            model.controller.blockQueue =
                model.controller.blockQueue.concat(
                    model.controller.randomArray(Array(1 * 7).fill().map((value, index) => index % 7)));
        // generate block
        model.board.pasteBlock(model.controller.x, model.controller.y, model.controller.type, model.controller.rot);
        // paste shadow
        model.controller.pasteShadow();
        // update next queue
        model.next.update();
        // set hold block
        model.hold.hasHolded = false;
        return true;
    };
    model.controller.getDropPlace = () => {
        var state = {
            x: model.controller.x,
            y: model.controller.y,
            type: model.controller.type,
            rot: model.controller.rot
        };
        model.board.eraseBlock(model.controller.x, model.controller.y, model.controller.type, model.controller.rot);
        while (true) {
            if (model.board.testCollision(state.x, state.y + 1, state.type, state.rot))
                break;
            state.y += 1;
        }
        model.board.pasteBlock(model.controller.x, model.controller.y, model.controller.type, model.controller.rot);
        return state;
    };
    model.controller.pasteShadow = () => {
        model.board.eraseShadow(model.controller.shadow.x, model.controller.shadow.y, model.controller.shadow.type, model.controller.shadow.rot);
        const state = model.controller.getDropPlace();
        model.controller.shadow.x = state.x;
        model.controller.shadow.y = state.y;
        model.controller.shadow.type = state.type;
        model.controller.shadow.rot = state.rot;
        model.board.pasteShadow(model.controller.shadow.x, model.controller.shadow.y, model.controller.shadow.type, model.controller.shadow.rot);
    };
    model.controller.rotateBlock = (dir) => {
        var moved = false;
        var new_rot = (model.controller.rot + 5 - 2 * dir) % 4;
        // get wall kick tests
        var rot_tests = model.block.SRS.getTests(model.controller.type, model.controller.rot, dir);
        model.board.eraseBlock(model.controller.x, model.controller.y, model.controller.type, model.controller.rot);
        // start testing
        for (var i = 0; i < rot_tests.length; i++) {
            const nx = model.controller.x + rot_tests[i][0];
            const ny = model.controller.y - rot_tests[i][1];
            if (!model.board.testCollision(nx, ny, model.controller.type, new_rot)) {
                model.controller.x = nx;
                model.controller.y = ny;
                model.controller.rot = new_rot;
                moved = true;
                break;
            }
        }
        model.board.pasteBlock(model.controller.x, model.controller.y, model.controller.type, model.controller.rot);
        model.controller.pasteShadow();
        return moved;
    };
    model.controller.key.moveLeft = () => {
        var moved = false;
        model.board.eraseBlock(model.controller.x, model.controller.y, model.controller.type, model.controller.rot);
        if (!model.board.testCollision(model.controller.x - 1, model.controller.y, model.controller.type, model.controller.rot)) {
            model.controller.x -= 1;
            model.controller.previousState.reset();
            moved = true;
        }
        model.board.pasteBlock(model.controller.x, model.controller.y, model.controller.type, model.controller.rot);
        model.controller.pasteShadow();
        return moved;
    };
    model.controller.key.moveRigh = () => {
        var moved = false;
        model.board.eraseBlock(model.controller.x, model.controller.y, model.controller.type, model.controller.rot);
        if (!model.board.testCollision(model.controller.x + 1, model.controller.y, model.controller.type, model.controller.rot)) {
            model.controller.x += 1;
            model.controller.previousState.reset();
            moved = true;
        }
        model.board.pasteBlock(model.controller.x, model.controller.y, model.controller.type, model.controller.rot);
        model.controller.pasteShadow();
        return moved;
    };
    model.controller.key.softDrop = () => {
        var moved = false;
        model.board.eraseBlock(model.controller.x, model.controller.y, model.controller.type, model.controller.rot);
        if (!model.board.testCollision(model.controller.x, model.controller.y + 1, model.controller.type, model.controller.rot)) {
            model.controller.y += 1;
            model.controller.previousState.reset();
            moved = true;
        }
        model.board.pasteBlock(model.controller.x, model.controller.y, model.controller.type, model.controller.rot);
        return moved;
    };
    model.controller.key.hardDrop = () => {
        var state = model.controller.getDropPlace();
        model.board.eraseBlock(model.controller.x, model.controller.y, model.controller.type, model.controller.rot);
        model.controller.x = state.x;
        model.controller.y = state.y;
        model.controller.type = state.type;
        model.controller.rot = state.rot;
        model.board.pasteBlock(model.controller.x, model.controller.y, model.controller.type, model.controller.rot);
        return model.controller.generateBlock();
    };
    model.controller.key.rotateLeft = () => {
        return model.controller.rotateBlock(1);
    };
    model.controller.key.rotateRight = () => {
        return model.controller.rotateBlock(0);
    };
    model.controller.key.rotate180 = () => {

    };
    model.controller.key.hold = () => {
        return model.hold.holdBlock();
    };
    model.controller.reset = () => {
        model.controller.blockQueue =
            model.controller.randomArray(Array(7).fill().map((value, index) => index % 7)).concat(
                model.controller.randomArray(Array(2 * 7).fill().map((value, index) => index % 7)));
        model.controller.generateBlock();
    };
    model.controller.update = () => {
        model.controller.key.softDrop();
        // if block unchanged, then next block
        if (model.controller.x == model.controller.previousState.x &&
            model.controller.y == model.controller.previousState.y &&
            model.controller.type == model.controller.previousState.type &&
            model.controller.rot == model.controller.previousState.rot) {
            return model.controller.generateBlock();
        }
        model.controller.previousState.x = model.controller.x;
        model.controller.previousState.y = model.controller.y;
        model.controller.previousState.type = model.controller.type;
        model.controller.previousState.rot = model.controller.rot;
        return true;
    };
    // initial model
    model.reset = () => {
        model.board.clear();
        model.controller.reset();
        model.hold.clear();
    };
    model.update = () => {
        var succ = model.controller.update();
        return succ;
    };
    model.board.clear();
    model.controller.reset();
    return model;
}

function CreateController(model, view, kwargs = {
    DRR: 500,    // drop repeat rate
    DAS: 100,    // delay auto shift
    ARR: 50,     // auto repeat rate
    SDDAS: 50,   // soft drop DAS
    SDARR: 20,   // soft drop ARR
    screenSpeed: 10,
    keys: {
        moveLeft: 37,
        moveRight: 39,
        softDrop: 40,
        hardDrop: 32,
        rotateLeft: 90,
        rotateRight: 38,
        rotate180: 65,
        holdBlock: 67
    }
}) {
    var controller = {
        model: model,
        view: view,
        DRR: kwargs.DRR,
        DAS: kwargs.DAS,
        ARR: kwargs.ARR,
        SDDAS: kwargs.SDDAS,
        SDARR: kwargs.SDARR,
        screenSpeed: kwargs.screenSpeed,
        modelUpdate: null,
        viewUpdate: null,
        modelTimer: null,
        viewTimer: null,
        setModelTimer: null,
        keyAction: {
            moveLeft: kwargs.keys.moveLeft,
            moveRight: kwargs.keys.moveRight,
            softDrop: kwargs.keys.softDrop,
            hardDrop: kwargs.keys.hardDrop,
            rotateLeft: kwargs.keys.rotateLeft,
            rotateRight: kwargs.keys.rotateRight,
            rotate180: kwargs.keys.rotate180,
            holdBlock: kwargs.keys.holdBlock
        },
        keyState: {},
        newKeyAction: null,
        keyDown: null,
        keyUp: null,
        keyFunctions: {
            moveLeft: null,
            moveRight: null,
            softDrop: null,
            hardDrop: null,
            rotateLeft: null,
            rotateRight: null,
            rotate180: null,
            holdBlock: null
        },
        state: {
            value: 0,
            UNAVAILABLE: 0,
            RESET: 1,
            START: 2,
            STOP: 3,
            FAILED: 4
        },
        reset: null,
        start: null,
        stop: null,
        destroy: null
    };
    controller.modelUpdate = () => {
        if (!controller.model.update()) {
            controller.stop();
            controller.state.value = controller.state.FAILED;
        }
    };
    controller.viewUpdate = () => {
        controller.view.board.update(controller.model.board.data, controller.model.board.shadow);
        controller.view.next.update(controller.model.next.queue);
        controller.view.hold.update(controller.model.hold.block);
    };
    controller.setModelTimer = () => {
        if (controller.modelTimer) {
            clearInterval(controller.modelTimer);
            controller.modelTimer = null;
        }
        controller.modelTimer = setInterval(() => {
            controller.modelUpdate();
            controller.setModelTimer();
        }, controller.DRR);
    };
    controller.newKeyAction = (func = null, delay = 0, speed = 0) => {
        var action = {
            enable: false,
            timer: null
        };
        if (func) {
            action.enable = true;
            func();
            setTimeout(() => {
                if (action.enable)
                    action.timer = setInterval(() => {
                        if (action.enable)
                            func();
                        else
                            clearInterval(action.timer);
                    }, speed);
            }, delay);
        }
        return action;
    };
    controller.keyDown = (e) => {
        if (controller.state.value != controller.state.START)
            return;
        if (!controller.keyState[e.keyCode])
            controller.keyState[e.keyCode] = {
                press: false,
                keyActionBuffer: Array(5).fill().map(() => controller.newKeyAction())
            };
        if (!controller.keyState[e.keyCode].press) {
            switch (e.keyCode) {
                case controller.keyAction.moveLeft:
                    try {
                        controller.keyState[controller.keyAction.moveRight].keyActionBuffer.forEach(value => { value.enable = false; });
                    } catch (e) { }
                    controller.keyState[e.keyCode].keyActionBuffer.pop();
                    controller.keyState[e.keyCode].keyActionBuffer.unshift(
                        controller.newKeyAction(
                            controller.keyFunctions.moveLeft,
                            controller.DAS,
                            controller.ARR
                        )
                    );
                    break;
                case controller.keyAction.moveRight:
                    try {
                        controller.keyState[controller.keyAction.moveLeft].keyActionBuffer.forEach(value => { value.enable = false; });
                    } catch (e) { }
                    controller.keyState[e.keyCode].keyActionBuffer.pop();
                    controller.keyState[e.keyCode].keyActionBuffer.unshift(
                        controller.newKeyAction(
                            controller.keyFunctions.moveRight,
                            controller.DAS,
                            controller.ARR
                        )
                    );
                    break;
                case controller.keyAction.softDrop:
                    controller.keyState[e.keyCode].keyActionBuffer.pop();
                    controller.keyState[e.keyCode].keyActionBuffer.unshift(
                        controller.newKeyAction(
                            controller.keyFunctions.softDrop,
                            controller.SDDAS,
                            controller.SDARR
                        )
                    );
                    break;
                case controller.keyAction.hardDrop:
                    controller.keyFunctions.hardDrop();
                    break;
                case controller.keyAction.rotateLeft:
                    controller.keyFunctions.rotateLeft();
                    break;
                case controller.keyAction.rotateRight:
                    controller.keyFunctions.rotateRight();
                    break;
                case controller.keyAction.rotate180:
                    controller.keyFunctions.rotate180();
                    break;
                case controller.keyAction.holdBlock:
                    controller.keyFunctions.holdBlock();
                    break;
            }
        }
        controller.keyState[e.keyCode].press = true;
    };
    controller.keyUp = (e) => {
        if (controller.state.value != controller.state.START)
            return;
        if (controller.keyState[e.keyCode].press) {
            switch (e.keyCode) {
                case controller.keyAction.moveLeft:
                case controller.keyAction.moveRight:
                case controller.keyAction.softDrop:
                    controller.keyState[e.keyCode].keyActionBuffer.forEach(value => { value.enable = false; });
                    break;
                case controller.keyAction.hardDrop:
                case controller.keyAction.rotateLeft:
                case controller.keyAction.rotateRight:
                case controller.keyAction.rotate180:
                case controller.keyAction.holdBlock:
                    break;
            }
        }
        controller.keyState[e.keyCode].press = false;
    };
    controller.keyFunctions.moveLeft = () => {
        controller.model.controller.key.moveLeft();
    };
    controller.keyFunctions.moveRight = () => {
        controller.model.controller.key.moveRigh();
    };
    controller.keyFunctions.softDrop = () => {
        if (controller.model.controller.key.softDrop())
            controller.setModelTimer();
    };
    controller.keyFunctions.hardDrop = () => {
        if (!controller.model.controller.key.hardDrop()) {
            controller.stop();
            controller.state.value = controller.state.FAILED;
            controller.viewUpdate();
            return false;
        }
        controller.setModelTimer();
        return true;
    };
    controller.keyFunctions.rotateLeft = () => {
        controller.model.controller.key.rotateLeft();
    };
    controller.keyFunctions.rotateRight = () => {
        controller.model.controller.key.rotateRight();
    };
    controller.keyFunctions.rotate180 = () => {
        controller.model.controller.key.rotate180();
    };
    controller.keyFunctions.holdBlock = () => {
        controller.model.controller.key.hold();
    };
    controller.reset = () => {
        controller.state.value = controller.state.RESET;
        controller.model.board.clear();
        controller.view.board.update(controller.model.board.data, controller.model.board.shadow);
        controller.model.reset();
        //controller.view.board.update(controller.model.board.data, controller.model.board.shadow);
        // stop model
        if (controller.modelTimer) {
            clearInterval(controller.modelTimer);
            controller.modelTimer = null;
        }
        // stop view
        if (controller.viewTimer) {
            clearInterval(controller.viewTimer);
            controller.viewTimer = null;
        }
    };
    controller.start = () => {
        if ((controller.state.value != controller.state.STOP &&
            controller.state.value != controller.state.RESET) ||
            controller.state.value == controller.state.FAILED)
            return false;
        controller.state.value = controller.state.START;
        // start model
        controller.setModelTimer();
        // start view
        controller.viewTimer = setInterval(() => controller.viewUpdate(), controller.screenSpeed);
        return true;
    };
    controller.stop = () => {
        if (controller.state.value != controller.state.START)
            return false;
        controller.state.value = controller.state.STOP;
        // stop model
        if (controller.modelTimer) {
            clearInterval(controller.modelTimer);
            controller.modelTimer = null;
        }
        // stop view
        if (controller.viewTimer) {
            clearInterval(controller.viewTimer);
            controller.viewTimer = null;
        }
        return true;
    };
    controller.destroy = () => {
        if (controller.modelTimer) {
            clearInterval(controller.modelTimer);
            controller.modelTimer = null;
        } else return false;
        if (controller.viewTimer) {
            clearInterval(controller.viewTimer);
            controller.viewTimer = null;
        } else return false;
        for (key in controller.keyState)
            controller.keyState[key].keyActionBuffer.forEach(value => { value.enable = false; });
        // document.onkeydown = null;
        // document.onkeyup = null;
        return true;
    };
    document.onkeydown = controller.keyDown;
    document.onkeyup = controller.keyUp;
    return controller;
}

function CreateTetris(board, next1, next2, next3, next4, next5, hold, kwargs = {
    control: {
        DRR: 500,
        DAS: 100,
        ARR: 50,
        SDDAS: 50,
        SDARR: 20,
        screenSpeed: 10,
        keys: {
            moveLeft: 37,
            moveRight: 39,
            softDrop: 40,
            hardDrop: 32,
            rotateLeft: 90,
            rotateRight: 38,
            rotate180: 65,
            holdBlock: 67
        }
    },
    view: {
        width: 10,
        height: 20,
        block_texture_src: "assets/white/texture10.png",
        block_shadow_src: "assets/white/texture1_shadow.png"
    }
}) {
    try {
        board = getCanvasElement(board);
        next1 = getCanvasElement(next1);
        next2 = getCanvasElement(next2);
        next3 = getCanvasElement(next3);
        next4 = getCanvasElement(next4);
        next5 = getCanvasElement(next5);
        hold = getCanvasElement(hold);
    }
    catch (e) { throw e; }
    // MVC software design pattern
    var tetris = {
        model: CreateModel(kwargs.view.width, kwargs.view.height),
        view: CreateView({
            board: board,
            next: [next1, next2, next3, next4, next5],
            hold: hold
        }, {
            block: {
                texture: {
                    block: kwargs.view.block_texture_src,
                    shadow: kwargs.view.block_shadow_src
                },
                width: 32,
                height: 32
            },
            board: {
                sx: 5,
                sy: 6,
                width: kwargs.view.width + 2,
                height: kwargs.view.height + 1
            },
            next: {
                sx: 1,
                sy: 1,
                width: 4,
                height: 4
            },
            hold: {
                sx: 1,
                sy: 1,
                width: 4,
                height: 4
            }
        }),
        controller: null,
        config: kwargs,
        setModel: null,
        setView: null,
        setController: null,
        setConfig: null,
        destroy: null
    };
    tetris.controller = CreateController(tetris.model, tetris.view, kwargs.control);
    tetris.setModel = () => {
        tetris.model = CreateModel(tetris.config.view.width, tetris.config.view.height);
        tetris.controller.model = tetris.model;
    };
    tetris.setView = () => {
        tetris.view = CreateView({
            board: board,
            next: [next1, next2, next3, next4, next5],
            hold: hold
        }, {
            block: {
                texture: {
                    block: tetris.config.view.block_texture_src,
                    shadow: tetris.config.view.block_shadow_src
                },
                width: 32,
                height: 32
            },
            board: {
                sx: 5,
                sy: 6,
                width: tetris.config.view.width + 2,
                height: tetris.config.view.height + 1
            },
            next: {
                sx: 1,
                sy: 1,
                width: 4,
                height: 4
            },
            hold: {
                sx: 1,
                sy: 1,
                width: 4,
                height: 4
            }
        });
        tetris.controller.view = tetris.view;
        // repaint view until texture has loaded
        var repaint = setInterval(() => {
            if (tetris.view.block.texture.ready || tetris.view.shadow.texture.ready)
                tetris.controller.viewUpdate();
            if (tetris.view.block.texture.ready && tetris.view.shadow.texture.ready) {
                clearInterval(repaint);
                repaint = null;
            }
        }, 10);
        // set limit time for repaint
        if (repaint) {
            setTimeout(() => {
                clearInterval(repaint);
                repaint = null;
            }, 1000);
        }
    };
    tetris.setController = () => {
        tetris.controller.DRR = tetris.config.control.DRR;
        tetris.controller.DAS = tetris.config.control.DAS;
        tetris.controller.ARR = tetris.config.control.ARR;
        tetris.controller.SDDAS = tetris.config.control.SDDAS;
        tetris.controller.SDARR = tetris.config.control.SDARR;
        tetris.controller.screenSpeed = tetris.config.control.screenSpeed;
        tetris.controller.keyAction.moveLeft = tetris.config.control.keys.moveLeft;
        tetris.controller.keyAction.moveRight = tetris.config.control.keys.moveRight;
        tetris.controller.keyAction.softDrop = tetris.config.control.keys.softDrop;
        tetris.controller.keyAction.hardDrop = tetris.config.control.keys.hardDrop;
        tetris.controller.keyAction.rotateLeft = tetris.config.control.keys.rotateLeft;
        tetris.controller.keyAction.rotateRight = tetris.config.control.keys.rotateRight;
        tetris.controller.keyAction.rotate180 = tetris.config.control.keys.rotate180;
        tetris.controller.keyAction.holdBlock = tetris.config.control.keys.holdBlock;
    };
    tetris.setConfig = (config = {
        control: {
            DRR: 500,
            DAS: 100,
            ARR: 50,
            SDDAS: 50,
            SDARR: 20,
            screenSpeed: 10,
            keys: {
                moveLeft: 37,
                moveRight: 39,
                softDrop: 40,
                hardDrop: 32,
                rotateLeft: 90,
                rotateRight: 38,
                rotate180: 65,
                holdBlock: 67
            }
        },
        view: {
            width: 10,
            height: 20,
            block_texture_src: "assets/white/texture10.png",
            block_shadow_src: "assets/white/texture1_shadow.png"
        }
    }) => {
        // view & model condiction
        const wdiff = tetris.config.view.width != config.view.width;
        const hdiff = tetris.config.view.height != config.view.height;
        const bdiff = tetris.config.view.block_texture_src != config.view.block_texture_src;
        const tdiff = tetris.config.view.block_shadow_src != config.view.block_shadow_src;
        tetris.config = config;
        // if model setting changed
        if (wdiff || hdiff) tetris.setModel();
        // if view setting changed
        if (wdiff || hdiff || bdiff || tdiff) tetris.setView();
        // set controller config
        tetris.setController();
    };
    // destructor
    tetris.destroy = () => {
        var destroyer = setInterval(() => {
            if (tetris.controller.destroy())
                clearInterval(destroyer);
        }, 0);
    }
    // reset tetris
    tetris.controller.reset();
    // start tetris
    tetris.controller.start();
    return tetris;
}

function CreateRecvModel(width, height) {
    const sx = 6, sy = 6;
    var model = {
        board: {
            data: Array(height + sy * 2).fill().map(() => new Uint8Array(width + sx * 2)),
            shadow: Array(height + sy * 2).fill().map(() => new Uint8Array(width + sx * 2)),
            sx: sx,
            sy: sy,
            width: width,
            height: height,
            clear: null
        },
        next: {
            queue: Array(5).fill().map(() => {
                return {
                    data: null,
                    type: -1,
                    width: 0,
                    height: 0,
                    offset_x: 0,
                    offset_y: 0
                };
            })
        },
        hold: {
            block: {
                data: null,
                type: -1,
                width: 0,
                height: 0,
                offset_x: 0,
                offset_y: 0
            },
            clear: null
        },
        setGameData: null,
        getGameData: null,
        reset: null
    };
    model.board.clear = () => {
        for (var i = 0; i < model.board.height; i++)
            for (var j = 0; j < model.board.width; j++)
                model.board.data[i + model.board.sy][j + model.board.sx] = 0x00;
        for (var i = 0; i < model.board.height; i++) {
            model.board.data[i + model.board.sy][model.board.sx - 1] = model.board.data[i + model.board.sy][model.board.width + model.board.sx] = 0x15;
        }
        for (var j = 0; j < model.board.width; j++) {
            model.board.data[model.board.sy - 1][j + model.board.sx] = 0x00;
            model.board.data[model.board.height + model.board.sy][j + model.board.sx] = 0x1A;
        }
        model.board.data[model.board.sy][model.board.sx - 1] = 0x14;
        model.board.data[model.board.sy - 1][model.board.sx - 1] = 0x14;
        model.board.data[model.board.height + model.board.sy][model.board.sx - 1] = 0x13;
        model.board.data[model.board.sy][model.board.width + model.board.sx] = 0x14;
        model.board.data[model.board.sy - 1][model.board.width + model.board.sx] = 0x14;
        model.board.data[model.board.height + model.board.sy][model.board.width + model.board.sx] = 0x19;
        // clear shadow
        for (var i = 0; i < model.board.height + 2 * model.board.sy; i++)
            for (var j = 0; j < model.board.width + 2 * model.board.sx; j++)
                model.board.shadow[i][j] = 0x00;
    };
    model.hold.clear = () => {
        model.hold.block.data = Array(2).fill().map(() => new Uint8Array(4));
        model.hold.block.type = -1;
        model.hold.block.width = 4;
        model.hold.block.height = 2;
    };
    model.setGameData = (data, shadow, queue, block) => {
        model.board.data = data;
        model.board.shadow = shadow;
        model.next.queue = queue;
        model.hold.block = block;
    };
    model.getGameData = () => {
        return {
            data: model.board.data,
            shadow: model.board.shadow,
            queue: model.next.queue,
            block: model.hold.block
        }
    };
    model.reset = () => {
        model.board.clear();
        model.hold.clear();
    };
    return model;
}

function CreateRecvController(model, view, kwargs = {
    screenSpeed: 10
}) {
    var controller = {
        model: model,
        view: view,
        screenSpeed: kwargs.screenSpeed,
        modelUpdate: null,
        viewUpdate: null,
        viewTimer: null,
        state: {
            value: 0,
            UNAVAILABLE: 0,
            RESET: 1,
            START: 2,
            STOP: 3,
            FAILED: 4
        },
        reset: null,
        start: null,
        stop: null,
        destroy: null
    };
    controller.viewUpdate = () => {
        controller.view.board.update(controller.model.board.data, controller.model.board.shadow);
        controller.view.next.update(controller.model.next.queue);
        controller.view.hold.update(controller.model.hold.block);
    };
    controller.reset = () => {
        controller.model.board.clear();
        controller.view.board.update(controller.model.board.data, controller.model.board.shadow);
        controller.model.reset();
        controller.view.board.update(controller.model.board.data, controller.model.board.shadow);
        // stop view
        if (controller.viewTimer) {
            clearInterval(controller.viewTimer);
            controller.viewTimer = null;
        }
    };
    controller.start = () => {
        // start view
        if (controller.viewTimer == null) {
            controller.viewTimer = setInterval(() => controller.viewUpdate(), controller.screenSpeed);
        }
    };
    controller.stop = () => {
        // stop view
        if (controller.viewTimer) {
            clearInterval(controller.viewTimer);
            controller.viewTimer = null;
        }
    };
    controller.destroy = () => {
        if (controller.viewTimer) {
            clearInterval(controller.viewTimer);
            controller.viewTimer = null;
        }
    };
    return controller;
}

function CreateRecvTetris(board, next1, next2, next3, next4, next5, hold, kwargs = {
    control: {
        screenSpeed: 10
    },
    view: {
        width: 10,
        height: 20,
        block_texture_src: "assets/white/texture10.png",
        block_shadow_src: "assets/white/texture1_shadow.png"
    }
}) {
    try {
        board = getCanvasElement(board);
        next1 = getCanvasElement(next1);
        next2 = getCanvasElement(next2);
        next3 = getCanvasElement(next3);
        next4 = getCanvasElement(next4);
        next5 = getCanvasElement(next5);
        hold = getCanvasElement(hold);
    }
    catch (e) { throw e; }
    // MVC software design pattern
    var tetris = {
        model: CreateRecvModel(kwargs.view.width, kwargs.view.height),
        view: CreateView({
            board: board,
            next: [next1, next2, next3, next4, next5],
            hold: hold
        }, {
            block: {
                texture: {
                    block: kwargs.view.block_texture_src,
                    shadow: kwargs.view.block_shadow_src
                },
                width: 32,
                height: 32
            },
            board: {
                sx: 5,
                sy: 6,
                width: kwargs.view.width + 2,
                height: kwargs.view.height + 1
            },
            next: {
                sx: 1,
                sy: 1,
                width: 4,
                height: 4
            },
            hold: {
                sx: 1,
                sy: 1,
                width: 4,
                height: 4
            }
        }),
        controller: null,
        config: kwargs,
        setModel: null,
        setView: null,
        setController: null,
        setConfig: null,
        destroy: null
    };
    tetris.controller = CreateRecvController(tetris.model, tetris.view, kwargs.control);
    tetris.setModel = () => {
        tetris.model = CreateRecvModel(tetris.config.view.width, tetris.config.view.height);
        tetris.controller.model = tetris.model;
    };
    tetris.setView = () => {
        tetris.view = CreateView({
            board: board,
            next: [next1, next2, next3, next4, next5],
            hold: hold
        }, {
            block: {
                texture: {
                    block: tetris.config.view.block_texture_src,
                    shadow: tetris.config.view.block_shadow_src
                },
                width: 32,
                height: 32
            },
            board: {
                sx: 5,
                sy: 6,
                width: tetris.config.view.width + 2,
                height: tetris.config.view.height + 1
            },
            next: {
                sx: 1,
                sy: 1,
                width: 4,
                height: 4
            },
            hold: {
                sx: 1,
                sy: 1,
                width: 4,
                height: 4
            }
        });
        tetris.controller.view = tetris.view;
        // repaint view until texture has loaded
        var repaint = setInterval(() => {
            if (tetris.view.block.texture.ready || tetris.view.shadow.texture.ready)
                tetris.controller.viewUpdate();
            if (tetris.view.block.texture.ready && tetris.view.shadow.texture.ready) {
                clearInterval(repaint);
                repaint = null;
            }
        }, 10);
        // set limit time for repaint
        if (repaint) {
            setTimeout(() => {
                clearInterval(repaint);
                repaint = null;
            }, 1000);
        }
    };
    tetris.setController = () => {
        tetris.controller.screenSpeed = tetris.config.control.screenSpeed;
    };
    tetris.setConfig = (config = {
        control: {
            screenSpeed: 10
        },
        view: {
            width: 10,
            height: 20,
            block_texture_src: "assets/white/texture10.png",
            block_shadow_src: "assets/white/texture1_shadow.png"
        }
    }) => {
        // view & model condiction
        const wdiff = tetris.config.view.width != config.view.width;
        const hdiff = tetris.config.view.height != config.view.height;
        const bdiff = tetris.config.view.block_texture_src != config.view.block_texture_src;
        const tdiff = tetris.config.view.block_shadow_src != config.view.block_shadow_src;
        tetris.config = config;
        // if model setting changed
        if (wdiff || hdiff) tetris.setModel();
        // if view setting changed
        if (wdiff || hdiff || bdiff || tdiff) tetris.setView();
        // set controller config
        tetris.setController();
    };
    // destructor
    tetris.destroy = () => {
        var destroyer = setInterval(() => {
            if (tetris.controller.destroy())
                clearInterval(destroyer);
        }, 0);
    }
    // reset tetris
    tetris.controller.reset();
    // start tetris
    tetris.controller.start(); /////////////////////////////////////??????????????????????????????????????????????????????????????????????????????????????????????????
    return tetris;
}

function MakeTetrisElement(name, control = false) {
    const
        board = "board",
        next1 = "next1",
        next2 = "next2",
        next3 = "next3",
        next4 = "next4",
        next5 = "next5",
        hold = "hold",
        reset = "reset",
        start = "start",
        pause = "pause",
        serverIP = "serverIP",
        status = "status",
        current_room = "current_room",
        role = "role",
        create = "create",
        roomId = "roomId",
        join = "join",
        leave = "leave",
        player_name = "player_name";
    var root = parseElement(`
    <div id="${name}" class="main">
        <div class="left-div">
            <div class="title-style">hold</div>
            <div class="block-style">
                <div>
                    <canvas id="${hold}"></canvas>
                </div>
            </div>
            <div class="controller-button-div">
                <button id="${reset}">
                    <i class="fas fa-redo-alt"></i>
                </button>
                <button id="${pause}">
                    <i class="fas fa-pause"></i>
                </button>
                <button id="${start}">
                    <i class="fas fa-play"></i>
                </button>
            </div>
            <div class="connect-server-div">
                <div>
                    <div>Server IP</div>
                    <input id="${serverIP}" type="text" value="127.0.0.1">
                    <div id="${status}">Offline</div>
                </div>
            </div>
            <div class="join-room-div">
            <div id="${current_room}">Room --</div>
            <div id="${role}">----</div>
                <button id="${create}">Create</button>
                <div>
                    <div>Room ID</div>
                    <input id="${roomId}" type="text" value="0">
                </div>
                <button id="${join}">Join</button>
                <button id="${leave}">Leave</button>
            </div>
        </div>
        <div class="board-div">
            <canvas id="${board}"></canvas>
        </div>
        <div class="right-div">
            <div class="title-style">next</div>
            <div class="block-style">
                <div>
                    <canvas id="${next1}"></canvas>
                </div>
            </div>
            <div class="block-style">
                <div>
                    <canvas id="${next2}"></canvas>
                </div>
            </div>
            <div class="block-style">
                <div>
                    <canvas id="${next3}"></canvas>
                </div>
            </div>
            <div class="block-style">
                <div>
                    <canvas id="${next4}"></canvas>
                </div>
            </div>
            <div class="block-style">
                <div>
                    <canvas id="${next5}"></canvas>
                </div>
            </div>
        </div>
        <input id="${player_name}" class="player-name" type="text" value="Set Name Here">
    </div>
    `);
    var
        elem_board = root.querySelector("#board"),
        elem_next1 = root.querySelector("#next1"),
        elem_next2 = root.querySelector("#next2"),
        elem_next3 = root.querySelector("#next3"),
        elem_next4 = root.querySelector("#next4"),
        elem_next5 = root.querySelector("#next5"),
        elem_hold = root.querySelector("#hold"),
        elem_reset = root.querySelector("#reset"),
        elem_start = root.querySelector("#start"),
        elem_pause = root.querySelector("#pause"),
        elem_serverIP = root.querySelector("#serverIP"),
        elem_status = root.querySelector("#status"),
        elem_current_room = root.querySelector("#current_room"),
        elem_role = root.querySelector("#role"),
        elem_create = root.querySelector("#create"),
        elem_roomId = root.querySelector("#roomId"),
        elem_join = root.querySelector("#join"),
        elem_leave = root.querySelector("#leave"),
        elem_player_name = root.querySelector("#player_name");
    var elem_list = [elem_board, elem_next1, elem_next2, elem_next3, elem_next4, elem_next5, elem_hold, elem_reset, elem_start, elem_pause, elem_serverIP, elem_status, elem_current_room, elem_role, elem_create, elem_create, elem_roomId, elem_join, elem_leave, elem_player_name];
    elem_list.forEach(elem => elem.id = "");
    if (!control) {
        var elem = null;
        elem = root.querySelector('.controller-button-div');
        elem.parentNode.removeChild(elem);
        elem = root.querySelector('.connect-server-div');
        elem.parentNode.removeChild(elem);
        elem = root.querySelector('.join-room-div');
        elem.parentNode.removeChild(elem);
        elem_player_name.disabled = true;
    }
    if (control) return {
        root: root,
        board: elem_board,
        next1: elem_next1,
        next2: elem_next2,
        next3: elem_next3,
        next4: elem_next4,
        next5: elem_next5,
        hold: elem_hold,
        reset: elem_reset,
        start: elem_start,
        pause: elem_pause,
        serverIP: elem_serverIP,
        status: elem_status,
        current_room: elem_current_room,
        role: elem_role,
        create: elem_create,
        roomId: elem_roomId,
        join: elem_join,
        leave: elem_leave,
        player_name: elem_player_name
    }; else return {
        root: root,
        board: elem_board,
        next1: elem_next1,
        next2: elem_next2,
        next3: elem_next3,
        next4: elem_next4,
        next5: elem_next5,
        hold: elem_hold
    };
}

function RemoveTetrisElement(name) {
    var elem = document.getElementById(name);
    elem.parentNode.removeChild(elem);
}

function CreateTetrisElement(name, main = false, kwargs = {
    control: {
        DRR: 500,
        DAS: 100,
        ARR: 50,
        SDDAS: 50,
        SDARR: 20,
        screenSpeed: 10,
        keys: {
            moveLeft: 37,
            moveRight: 39,
            softDrop: 40,
            hardDrop: 32,
            rotateLeft: 90,
            rotateRight: 38,
            rotate180: 65,
            holdBlock: 67
        }
    },
    view: {
        width: 10,
        height: 20,
        block_texture_src: "assets/white/texture10.png",
        block_shadow_src: "assets/white/texture1_shadow.png"
    }
}) {
    var tetrisObject = {
        htmlElement: null,
        game: null,
        enableControlButton: null,
        disableControlButton: null
    };
    var elem = MakeTetrisElement(name, main);
    var tetris = null;
    if (main) {
        tetris = CreateTetris(elem.board, elem.next1, elem.next2, elem.next3, elem.next4, elem.next5, elem.hold, kwargs);
        elem.reset.onclick = tetris.controller.reset;
        elem.start.onclick = tetris.controller.start;
        elem.pause.onclick = tetris.controller.stop;
    } else {
        tetris = CreateRecvTetris(elem.board, elem.next1, elem.next2, elem.next3, elem.next4, elem.next5, elem.hold, kwargs);
    }
    // initial tetrisObject
    tetrisObject.htmlElement = elem;
    tetrisObject.game = tetris;
    tetrisObject.enableControlButton = () => {
        elem.reset.disabled = false;
        elem.start.disabled = false;
        elem.pause.disabled = false;
    };
    tetrisObject.disableControlButton = () => {
        elem.reset.disabled = true;
        elem.start.disabled = true;
        elem.pause.disabled = true;
    };
    return tetrisObject;
}

function CreateRemote(remoteIP, remotePort) {
    var remote = {
        socket: null,
        msgType: {
            // send/recv
            PLAYER_INFO: 0,
            // send/recv
            GAME_SETTING: 1,
            // send/recv
            GAME_START: 2,
            // send/recv
            GAME_STOP: 3,
            // send/recv
            GAME_STREAM_DATA: 4,
            // send
            GAME_ATTACK: 5,
            // recv
            GAME_ATTACK_AIM: 6,
            // send
            CREATE_ROOM: 7,
            // send
            JOIN_ROOM: 8,
            // recv
            GET_PLAYER_INFO: 9,
            // recv
            GET_GAME_SETTING: 10,
            // recv
            ROOM_ID: 11,
            // recv
            ROOM_ROLE: 12,
            // send
            LEAVE_ROOM: 13,
            // send/recv
            GAME_RESET: 14
        },
        on: {
            updatePlayerInfo: null,
            updateGameSetting: null,
            gameStart: null,
            gameStop: null,
            gameStreamData: null,
            gameAttackAim: null,
            getPlayInfo: null,
            getGameSetting: null,
            getRoomId: null,
            getRoomRole: null,
            gameReset: null,
            // native events
            open: null,
            close: null
        },
        // send msg functions
        sendPlayerInfo: null,
        sendGameSetting: null,
        sendGameStart: null,
        sendGameStop: null,
        sendGameStreamData: null,
        sendGameAttack: null,
        sendCreateRoom: null,
        sendJoinRoom: null,
        sendLeaveRoom: null,
        sendGameReset: null
    };
    remote.socket = new WebSocket("ws://" + remoteIP + ":" + remotePort);
    remote.socket.onopen = () => {
        if (remote.on.open)
            remote.on.open();
    };
    remote.socket.onclose = () => {
        if (remote.on.close)
            remote.on.close();
    };
    remote.socket.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        console.log(data);
        switch (data.header.type) {
            case remote.msgType.PLAYER_INFO:
                if (remote.on.updatePlayerInfo)
                    remote.on.updatePlayerInfo(data.data);
                break;
            case remote.msgType.GAME_SETTING:
                if (remote.on.updateGameSetting)
                    remote.on.updateGameSetting();
                break;
            case remote.msgType.GAME_START:
                if (remote.on.gameStart)
                    remote.on.gameStart();
                break;
            case remote.msgType.GAME_STOP:
                if (remote.on.gameStop)
                    remote.on.gameStop();
                break;
            case remote.msgType.GAME_STREAM_DATA:
                if (remote.on.gameStreamData)
                    remote.on.gameStreamData(data.data);
                break;
            case remote.msgType.GAME_ATTACK_AIM:
                if (remote.on.gameAttackAim)
                    remote.on.gameAttackAim();
                break;
            case remote.msgType.GET_PLAYER_INFO:
                if (remote.on.getPlayInfo)
                    remote.on.getPlayInfo();
                break;
            case remote.msgType.GET_GAME_SETTING:
                if (remote.on.getGameSetting)
                    remote.on.getGameSetting();
                break;
            case remote.msgType.ROOM_ID:
                if (remote.on.getRoomId)
                    remote.on.getRoomId(data.data);
                break;
            case remote.msgType.ROOM_ROLE:
                if (remote.on.getRoomRole)
                    remote.on.getRoomRole(data.data);
                break;
            case remote.msgType.GAME_RESET:
                if (remote.on.gameReset)
                    remote.on.gameReset();
        }
    }
    // send msg functions
    remote.sendPlayerInfo = (data) => {
        remote.socket.send(JSON.stringify({
            header: {
                type: remote.msgType.PLAYER_INFO
            },
            data: data
        }));
    };
    remote.sendGameSetting = () => {

    };
    remote.sendGameStart = () => {
        remote.socket.send(JSON.stringify({
            header: {
                type: remote.msgType.GAME_START
            }
        }));
    };
    remote.sendGameStop = () => {
        remote.socket.send(JSON.stringify({
            header: {
                type: remote.msgType.GAME_STOP
            }
        }));
    };
    remote.sendGameStreamData = (data) => {
        remote.socket.send(JSON.stringify({
            header: {
                type: remote.msgType.GAME_STREAM_DATA
            },
            data: data
        }));
    };
    remote.sendGameAttack = () => {

    };
    remote.sendCreateRoom = () => {
        remote.socket.send(JSON.stringify({
            header: {
                type: remote.msgType.CREATE_ROOM
            }
        }));
    };
    remote.sendJoinRoom = (data) => {
        remote.socket.send(JSON.stringify({
            header: {
                type: remote.msgType.JOIN_ROOM
            },
            data: data
        }));
    };
    remote.sendLeaveRoom = () => {
        remote.socket.send(JSON.stringify({
            header: {
                type: remote.msgType.LEAVE_ROOM
            }
        }));
    };
    remote.sendGameReset = () => {
        remote.socket.send(JSON.stringify({
            header: {
                type: remote.msgType.GAME_RESET
            }
        }));
    };
    return remote;
}

function CreateGameHandler(mainContainer, recvContainer, kwargs = {
    tetris: {
        control: {
            DRR: 500,
            DAS: 100,
            ARR: 50,
            SDDAS: 50,
            SDARR: 20,
            screenSpeed: 10,
            keys: {
                moveLeft: 37,
                moveRight: 39,
                softDrop: 40,
                hardDrop: 32,
                rotateLeft: 90,
                rotateRight: 38,
                rotate180: 65,
                holdBlock: 67
            }
        },
        view: {
            width: 10,
            height: 20,
            block_texture_src: "assets/white/texture10.png",
            block_shadow_src: "assets/white/texture1_shadow.png"
        }
    }
}) {
    let handler = {
        games: {
            main: null,
            others: []
        },
        game_status: {
            role: {
                HOST: 0,
                GUEST: 1,
                FAILED: -1
            },
            roomId: null,
            roomRole: -1
        },
        connection: {
            remote: null,
            connectToServer: null,
            disconnect: null,
            send_game_stream_data_timer: null,
            set_game_stream_data_timer: null,
            stop_game_stream_data_timer: null,
            on: {
                updatePlayerInfo: null,
                updateGameSetting: null,
                gameStart: null,
                gameStop: null,
                gameStreamData: null,
                gameAttackAim: null,
                getPlayInfo: null,
                getGameSetting: null,
                getRoomId: null,
                getRoomRole: null,
                gameReset: null,
                // native events
                open: null,
                close: null
            }
        },
        updatePlayerInfo: null,
        leaveRoom: null,
    };
    handler.games.main = CreateTetrisElement("tetris", true);
    // debug
    console.log(handler.games.main.htmlElement);
    // set game control callback functions
    const prev_reset_onclick = handler.games.main.htmlElement.reset.onclick;
    const prev_start_onclick = handler.games.main.htmlElement.start.onclick;
    const prev_pause_onclick = handler.games.main.htmlElement.pause.onclick;
    handler.games.main.htmlElement.reset.onclick = () => {
        if (handler.game_status.roomId == -1 || handler.connection.remote == null || handler.connection.remote.socket.readyState != 1) {
            if (prev_reset_onclick) prev_reset_onclick();
        } else {
            handler.connection.remote.sendGameReset();
        }
    };
    handler.games.main.htmlElement.start.onclick = () => {
        if (handler.game_status.roomId == -1 || handler.connection.remote == null || handler.connection.remote.socket.readyState != 1) {
            if (prev_start_onclick) prev_start_onclick();
        } else {
            handler.connection.remote.sendGameStart();
        }
    };
    handler.games.main.htmlElement.pause.onclick = () => {
        if (handler.game_status.roomId == -1 || handler.connection.remote == null || handler.connection.remote.socket.readyState != 1) {
            if (prev_pause_onclick) prev_pause_onclick();
        } else {
            handler.connection.remote.sendGameStop();
        }
    };
    handler.games.main.htmlElement.create.onclick = () => {
        handler.connection.connectToServer(handler.games.main.htmlElement.serverIP.value, 4000).then(res => {
            // if connect success
            handler.connection.remote.sendLeaveRoom();
            handler.connection.remote.sendCreateRoom();
        }).catch((err) => { });
    };
    handler.games.main.htmlElement.join.onclick = () => {
        handler.connection.connectToServer(handler.games.main.htmlElement.serverIP.value, 4000).then(res => {
            // if connect success
            handler.connection.remote.sendLeaveRoom();
            handler.connection.remote.sendJoinRoom(parseInt(handler.games.main.htmlElement.roomId.value));
        }).catch((err) => { });
    };
    handler.games.main.htmlElement.leave.onclick = () => {
        handler.leaveRoom();
        // test conntection
        if (handler.connection.remote == null || handler.connection.remote.socket.readyState != 1)
            return;
        handler.connection.remote.sendLeaveRoom();
    }
    handler.games.main.htmlElement.player_name.onchange = () => {
        if (handler.connection.remote == null || handler.connection.remote.socket.readyState != 1)
            return;
        handler.connection.remote.sendPlayerInfo({
            name: handler.games.main.htmlElement.player_name.value,
            block_texture_src: handler.games.main.game.config.view.block_texture_src,
            block_shadow_src: handler.games.main.game.config.view.block_shadow_src
        });
    };
    /*
    handler.games.main.htmlElement.reset
    handler.games.main.htmlElement.start
    handler.games.main.htmlElement.pause
    handler.games.main.htmlElement.serverIP
    handler.games.main.htmlElement.status
    handler.games.main.htmlElement.create
    handler.games.main.htmlElement.roomId
    handler.games.main.htmlElement.join
    handler.games.main.htmlElement.leave
    handler.games.main.htmlElement.player_name
    */
    // member function
    handler.connection.connectToServer = (remoteIP, remotePort) => {
        const connect = () => {
            return new Promise((resolve, reject) => {
                // create remote handler
                handler.connection.remote = CreateRemote(remoteIP, remotePort);
                // set callback functions
                let remote_on = handler.connection.remote.on;
                let this_on = handler.connection.on;
                remote_on.updatePlayerInfo = this_on.updatePlayerInfo;
                remote_on.updateGameSetting = this_on.updateGameSetting;
                remote_on.gameStart = this_on.gameStart;
                remote_on.gameStop = this_on.gameStop;
                remote_on.gameStreamData = this_on.gameStreamData;
                remote_on.gameAttackAim = this_on.gameAttackAim;
                remote_on.getPlayInfo = this_on.getPlayInfo;
                remote_on.getGameSetting = this_on.getGameSetting;
                remote_on.getRoomId = this_on.getRoomId;
                remote_on.getRoomRole = this_on.getRoomRole;
                remote_on.gameReset = this_on.gameReset;
                remote_on.open = () => {
                    remote_on.open = this_on.open;
                    remote_on.open();
                    resolve();
                }
                remote_on.close = this_on.close;
            });
        };
        const url = `ws://${remoteIP}:${remotePort}/`;
        if (handler.connection.remote == null) {
            return connect();
        }
        if (handler.connection.remote != null && handler.connection.remote.socket.url != url) {
            return new Promise((resolve, reject) => {
                const close_callback = handler.connection.remote.on.close;
                handler.connection.remote.on.close = () => {
                    close_callback();
                    connect().then(res => {
                        resolve();
                    });
                }
                handler.connection.remote.socket.close();
            });
        }
        return new Promise((resolve, reject) => {
            if (handler.connection.remote.socket.readyState == 1)
                resolve();
            else
                reject();
        });
    };
    // game stream data
    handler.connection.set_game_stream_data_timer = () => {
        if (handler.connection.send_game_stream_data_timer != null) return;
        handler.connection.send_game_stream_data_timer = setInterval(() => {
            handler.connection.remote.sendGameStreamData({
                data: handler.games.main.game.model.board.data,
                shadow: handler.games.main.game.model.board.shadow,
                queue: handler.games.main.game.model.next.queue,
                block: handler.games.main.game.model.hold.block
            });
            console.log("STREAMING");
        }, 10);
    };
    handler.connection.stop_game_stream_data_timer = () => {
        if (handler.connection.send_game_stream_data_timer == null) return;
        clearInterval(handler.connection.send_game_stream_data_timer);
        handler.connection.send_game_stream_data_timer = null;
    };
    handler.updatePlayerInfo = (data) => {
        handler.game_status.player_info = data;
        if (handler.game_status.player_info.length != handler.games.others.length) {
            const diff = handler.game_status.player_info.length - handler.games.others.length;
            // add some recver
            if (diff > 0) {
                console.log("add some recver");
                for (let i = 0; i < diff; i++) {
                    let new_recv = CreateTetrisElement("recv", false);
                    handler.games.others.push(new_recv);
                    recvContainer.appendChild(new_recv.htmlElement.root);
                }
            }
            // remove some recver
            else {
                console.log("remove some recver");
                for (let i = 0; i < -diff; i++) {
                    let remove_recv = handler.games.others.pop();
                    remove_recv.game.destroy()
                    recvContainer.removeChild(remove_recv.htmlElement.root);
                }
            }
        }
    };
    handler.leaveRoom = () => {
        handler.game_status.roomId = -1;
        handler.games.main.htmlElement.current_room.innerHTML = "Room --";
        handler.game_status.roomRole = -1;
        handler.games.main.htmlElement.role.innerHTML = "----";
        handler.games.main.enableControlButton();
        handler.connection.stop_game_stream_data_timer();
        /*
        handler.games.main.htmlElement.reset.onclick = prev_reset_onclick;
        handler.games.main.htmlElement.start.onclick = prev_start_onclick;
        handler.games.main.htmlElement.pause.onclick = prev_pause_onclick;
        */
    };
    // initial callback functions
    handler.connection.on.updatePlayerInfo = (data) => {
        console.log("player info");
        console.log(data);
        handler.updatePlayerInfo(data);
    };
    handler.connection.on.updateGameSetting = () => {

    };
    handler.connection.on.gameStart = () => {
        prev_start_onclick();
        if (handler.game_status.recv_update_timer != null) return;
        handler.connection.set_game_stream_data_timer();




        // exec each recv ~~~~~~~~!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


        /*
        handler.games.others.forEach((game, index) => {

            game.model.setGameData(data, shadow, queue, block);

        });
*/








    };
    handler.connection.on.gameStop = () => {
        prev_pause_onclick();
        handler.connection.stop_game_stream_data_timer();

        // stop each recv ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    };
    handler.connection.on.gameStreamData = (data) => {
        handler.games.others.forEach((tetrisElem, index) => {
            tetrisElem.game.model.setGameData(data[index].data, data[index].shadow, data[index].queue, data[index].block);
        });
    };
    handler.connection.on.gameAttackAim = () => {

    };
    handler.connection.on.getPlayInfo = () => {
        console.log("Get Player Info");
        handler.connection.remote.sendPlayerInfo({
            name: handler.games.main.htmlElement.player_name.value,
            block_texture_src: handler.games.main.game.config.view.block_texture_src,
            block_shadow_src: handler.games.main.game.config.view.block_shadow_src
        });
    };
    handler.connection.on.getGameSetting = () => {
        console.log("Get Game Setting");
    };
    handler.connection.on.getRoomId = (data) => {
        console.log("Get Room Id:" + data);
        handler.game_status.roomId = data;
        if (data == -1)
            handler.games.main.htmlElement.current_room.innerHTML = "Room --";
        else
            handler.games.main.htmlElement.current_room.innerHTML = `Room ${data}`;
    };
    handler.connection.on.getRoomRole = (data) => {
        console.log("Get Room Role:" + data);
        handler.game_status.roomRole = data;
        switch (data) {
            case handler.game_status.role.HOST:
                handler.games.main.htmlElement.role.innerHTML = "Host";
                handler.games.main.enableControlButton();
                break;
            case handler.game_status.role.GUEST:
                handler.games.main.htmlElement.role.innerHTML = "Guest";
                handler.games.main.disableControlButton();
                break;
            case handler.game_status.role.FAILED:
                handler.games.main.htmlElement.role.innerHTML = "Failed";
                handler.games.main.enableControlButton();
                break;
        }
    };
    handler.connection.on.gameReset = () => {
        console.log("reset");
        prev_reset_onclick();
        handler.connection.stop_game_stream_data_timer();

        // reset recv model ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    };
    // native events
    handler.connection.on.open = () => {
        console.log("open!");
        handler.games.main.htmlElement.status.innerHTML = "Online";
    };
    handler.connection.on.close = () => {
        console.log("close!");
        handler.connection.remote = null;
        handler.games.main.htmlElement.status.innerHTML = "Offline";
        handler.leaveRoom();
        handler.updatePlayerInfo([]);
    };
    // add tetris game to main screen
    mainContainer.appendChild(handler.games.main.htmlElement.root);
    return handler;
}

function CreateReplayer(container) {
    var replayer = {
        model: CreateModel(10, 20),
        tetris: CreateTetrisElement('replay'),
        rewards: null,
        total_rewards: null,
        setGameData: null,
        render: null,
        replay: null,
        timer: null,
        onrender: null
    };
    replayer.setGameData = (board, hold, next, rewards) => {
        let game_data = replayer.tetris.game.model.getGameData();
        for (let i = 0; i < replayer.model.board.height; i++)
            for (let j = 0; j < replayer.model.board.width; j++)
                game_data.data[replayer.model.board.sy + i][replayer.model.board.sx + j]
                    = board[i * replayer.model.board.width + j];
        for (var i = 0; i < 5; i++) {
            const type = next[i];
            game_data.queue[i].data = replayer.model.block.data[type][0];
            game_data.queue[i].type = type;
            game_data.queue[i].width = replayer.model.block.size[type].width;
            game_data.queue[i].height = replayer.model.block.size[type].height;
            game_data.queue[i].offset_x = replayer.model.block.centerOffset[type][0];
            game_data.queue[i].offset_y = replayer.model.block.centerOffset[type][1];
        }
        replayer.tetris.game.model.setGameData(game_data.data, game_data.shadow, game_data.queue, game_data.block);
        replayer.rewards = rewards;
        replayer.total_rewards += rewards;
    };
    replayer.render = () => {
        replayer.tetris.game.view.board.update(replayer.tetris.game.model.board.data, replayer.tetris.game.model.board.shadow);
        replayer.tetris.game.view.next.update(replayer.tetris.game.model.next.queue);
        replayer.tetris.game.view.hold.update(replayer.tetris.game.model.hold.block);
        if (replayer.onrender)
            replayer.onrender(replayer.rewards, replayer.total_rewards);

    };
    replayer.replay = (delay, data) => {
        if (replayer.timer) {
            clearTimeout(replayer.timer);
            replayer.timer = null;
        }
        let index = 0;
        let length = data.length;
        replayer.rewards = 0;
        replayer.total_rewards = 0;
        function update() {
            let game_data = data[index++];
            if (index >= length) {
                clearTimeout(replayer.timer);
                replayer.timer = null;
            }
            replayer.setGameData(game_data.board, game_data.hold, game_data.next, game_data.rewards);
            replayer.render();
            replayer.timer = setTimeout(update, delay());
        }
        replayer.timer = setTimeout(update, delay());
    };
    container.appendChild(replayer.tetris.htmlElement.root);
    let elem = replayer.tetris.htmlElement.root.querySelector(".player-name");
    elem.parentNode.removeChild(elem);
    return replayer;
}