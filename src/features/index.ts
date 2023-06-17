import express from 'express';
import bodyParser from 'body-parser';
import TestPostPlaceholder from './redis/ioredis/cache/test-post-placeholder';
import TestBullMQ from './redis/bullmq';
import UserBullMQ from './redis/bullmq/user';
import memcacheTestPlaceholder from './memcached/test-post-placeholder';

const routes = express.Router();

routes.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
routes.use(bodyParser.json());
routes.use('/redis/placeholder', TestPostPlaceholder);
routes.use('/redis/bullmq/user', UserBullMQ);
routes.use('/redis/bullmq', TestBullMQ);

// Memcached
routes.use('/memcached/placeholder', memcacheTestPlaceholder);

export default routes;