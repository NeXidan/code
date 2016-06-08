function generateSessionId() {
    var value = Math.floor(Math.random() * (1 << 30));

    return Swarm.Spec.int2base(value);
}

if (window !== undefined) {
    var sessionId = window.localStorage.getItem('localuser');

    if (!sessionId) {
        sessionId = generateSessionId();
        window.localStorage.setItem('localuser', sessionId);
    }

    var storage = new Swarm.SharedWebStorage('webst', {persistent:true});
    var swarmHost = Swarm.env.localhost = new Swarm.Host(sessionId, 0, storage);

    swarmHost.connect('ws://' + window.location.host, {delay: 50});
}
