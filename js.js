'use strict';

$(() => {
    let app = {
        data: {
            start: false,
        },
        el: {
            h1      : $('h1'),
            log     : $('.log'),
        },
        log: (mess, mode='+') => {

            mode = mode === '+'? 'append': 'html';

            app.el.log[mode](`<p>${mess}</p>`);

            return app;
        },
        start: () => {
            app.log(` -- START -- ${new Date().toJSON()}`);
            app.data.start = true;
            return app;
        },
        set: {
            run: () => {
                if (!document.hidden) {
                    app.start();
                }

                return app.set;
            },
            behaviors: () => {

                app.set.handler
                    .modeChange()
                    .h1Click();

                return app.set;
            },
            handler: {
                h1Click: () => {

                    app.el.h1.click(() => {
                        // app.log('', false)
                        
                        app.log(` -- CLICK -- ${new Date().toJSON()}`);
                    });

                    return app.set.handler;
                },
                modeChange: () => {
                    $(window)
                        /*.focusin(() => {
                            app.log('focusin');
                        })*/
                        .on("blur focus", function(e) {
                            var prevType = $(this).data("prevType");
                            var date = new Date().toJSON();
                            if (prevType != e.type) {   //  reduce double fire issues
                                switch (e.type) {
                                    case 'blur':
                                        // app.log(`<code>${date}</code> - Blured ${document.hidden}`);
                                        break;
                                    case 'focus':
                                        if (!app.data.start) {
                                            app.start();
                                        }
                                        // app.log(`<code>${date}</code> - Focused ${document.hidden}`);
                                        break;
                                }
                            }

                            $(this).data("prevType", e.type);
                        });
                    return app.set.handler;
                },
            },
        },
        init: () => {

            app.set
                .run()
                .behaviors();

            return app;
        },
    };

    window.app = app;

    app.init();
});
