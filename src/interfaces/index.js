import axios from 'axios'
import Fetch from './fetch'


export default {
   async fetch () {
   	 let host = 'www.baidu.com';
   	 let fetch = new Fetch(host)
   	 return fetch.fetch(...arguments)
   }
//  this is a demon	 
//  async getInfor () {
//    return await this.fetch('../../static/information.json', true,  'GET')
//  }
}
