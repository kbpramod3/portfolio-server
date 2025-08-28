import NodeCache from "node-cache";

const epsCache = new NodeCache({ stdTTL: 24 * 60 * 60, checkperiod: 60 * 60 });

export default epsCache;
