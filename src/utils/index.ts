export const getIframeNode = (id: string): null | HTMLDivElement => {
    const chatWidgetIframe = document.getElementById(
      "chat-widget-iframe"
    ) as HTMLIFrameElement;
    const doc = chatWidgetIframe.contentWindow?.document;
    if (!doc) return null;
    const div = doc.getElementById(id);
    return div as HTMLDivElement;
};