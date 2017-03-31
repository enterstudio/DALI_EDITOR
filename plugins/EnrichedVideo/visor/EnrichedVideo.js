export function EnrichedVideo(base) {
    return {
        init: function () {
            base.registerExtraFunction(this.imageClicky, "click");
        },
        getRenderTemplate: function (state) {
            /*return "<video " + (state.controls && state.controls !== "on" ? "controls='true' " : "") +
             (state.autoplay ? " autoplay " : "") +
              " style=\"width: 100%; height: 100%; z-index:0;\" src=\"" +
               state.url +
                "\"  class=\"basicVideoClass\"></video>";*/
            return "<video " +
                ((state.controls) ? " controls='true' " : "") +
                ((state.autoplay) ? " autoPlay " : "") +
                " style=\"width: 100%; height: 100%; pointer-events: 'none'; z-index:0;\" src=\"" +
                state.url + "\" ontimeupdate='$dali$.timeUpdate()'></video>";
        },
        timeUpdate: function (e, element, parent) {
            var time = Math.floor(e.target.currentTime * 10) / 10;

            base.triggerMark(parent, function (marks) {
                console.log(time);
                if (time === 10) {
                    return "a";
                }
                return;
            });
        }
    };
}
