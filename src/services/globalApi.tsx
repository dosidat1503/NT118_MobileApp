import axios from "axios";

const BASE_URL = "http://10.20.7.112:8000";

const getFADs = async (userData: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/getAllFAD`, {
      params: {
        adminId: userData
      }
    });
    return response.data;
  } catch (error: any) {
    // Handle errors
    if (error.response) {
      // Strapi returns errors in `error.response.data`
      console.error("Error:", error.response.data);
      throw error.response.data; // Rethrow to handle elsewhere
    } else {
      console.error("Network or unknown error:", error);
      throw new Error("Network or unknown error occurred");
    }
  }
};


const addFAD = async (request: object) => {
  try {
    const json = JSON.stringify(request);
    console.log(json);
    const response = await axios.post(`${BASE_URL}/api/addFAD`, json, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error: any) {
    // Handle errors
    if (error.response) {
      // Strapi returns errors in `error.response.data`
      console.error("Error:", error.response.data);
      throw error.response.data; // Rethrow to handle elsewhere
    } else {
      console.error("Network or unknown error:", error);
      throw new Error("Network or unknown error occurred");
    }
  }
};

const getFAD = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/getFAD/${id}`);
    return response.data;
  } catch (error: any) {
    // Handle errors
    if (error.response) {
      // Strapi returns errors in `error.response.data`
      console.error("Error:", error.response.data);
      throw error.response.data; // Rethrow to handle elsewhere
    } else {
      console.error("Network or unknown error:", error);
      throw new Error("Network or unknown error occurred");
    }
  }
};

const updateFAD = async (request: object, id: number) => {
  try {
    const json = JSON.stringify(request);
    console.log(json);
    const response = await axios.put(`${BASE_URL}/api/updateFAD/${id}`, json, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error: any) {
    // Handle errors
    if (error.response) {
      // Strapi returns errors in `error.response.data`
      console.error("Error:", error.response.data);
      throw error.response.data; // Rethrow to handle elsewhere
    } else {
      console.error("Network or unknown error:", error);
      throw new Error("Network or unknown error occurred");
    }
  }
};

const deleteFAD = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/deleteFAD/${id}`);
    return response.data;
  } catch (error: any) {
    // Handle errors
    if (error.response) {
      // Strapi returns errors in `error.response.data`
      console.error("Error:", error.response.data);
      throw error.response.data; // Rethrow to handle elsewhere
    } else {
      console.error("Network or unknown error:", error);
      throw new Error("Network or unknown error occurred");
    }
  }
};

// shop info
const getShopDetail = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/admin/getShopDetail/${id}`);
    return response.data;
  } catch (error: any) {
    // Handle errors
    if (error.response) {
      // Strapi returns errors in `error.response.data`
      console.error("Error:", error.response.data);
      throw error.response.data; // Rethrow to handle elsewhere
    } else {
      console.error("Network or unknown error:", error);
      throw new Error("Network or unknown error occurred");
    }
  }
};

const getAllVouchers = async (shopId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/admin/getAllVouchers`,
      { params: { shop_id: shopId } });
    return response.data;
  } catch (error: any) {
    // Handle errors
    if (error.response) {
      // Strapi returns errors in `error.response.data`
      console.error("Error:", error.response.data);
      throw error.response.data; // Rethrow to handle elsewhere
    } else {
      console.error("Network or unknown error:", error);
      throw new Error("Network or unknown error occurred");
    }
  }
};

const addVoucher = async (voucherInfo: object) => {
  try {
    const json = JSON.stringify(voucherInfo);
    console.log(json);
    const response = await axios.post(`${BASE_URL}/api/admin/addVoucher`, json, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error: any) {
    // Handle errors
    if (error.response) {
      // Strapi returns errors in `error.response.data`
      console.error("Error:", error.response.data);
      throw error.response.data; // Rethrow to handle elsewhere
    } else {
      console.error("Network or unknown error:", error);
      throw new Error("Network or unknown error occurred");
    }
  }
};

const getVoucher = async (voucherId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/admin/getVoucher/${voucherId}`);
    return response.data;
  } catch (error: any) {
    // Handle errors
    if (error.response) {
      // Strapi returns errors in `error.response.data`
      console.error("Error:", error.response.data);
      throw error.response.data; // Rethrow to handle elsewhere
    } else {
      console.error("Network or unknown error:", error);
      throw new Error("Network or unknown error occurred");
    }
  }
};

const updateVoucher = async (request: object, id: number) => {
  try {
    const json = JSON.stringify(request);
    console.log(json);
    const response = await axios.put(`${BASE_URL}/api/admin/updateVoucher/${id}`, json, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error: any) {
    // Handle errors
    if (error.response) {
      // Strapi returns errors in `error.response.data`
      console.error("Error:", error.response.data);
      throw error.response.data; // Rethrow to handle elsewhere
    } else {
      console.error("Network or unknown error:", error);
      throw new Error("Network or unknown error occurred");
    }
  }
};


const deleteVoucher = async (voucherId: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/admin/deleteVoucher/${voucherId}`);
    return response.data;
  } catch (error: any) {
    // Handle errors
    if (error.response) {
      // Strapi returns errors in `error.response.data`
      console.error("Error:", error.response.data);
      throw error.response.data; // Rethrow to handle elsewhere
    } else {
      console.error("Network or unknown error:", error);
      throw new Error("Network or unknown error occurred");
    }
  }
};

const getShopInfo = async (shopId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/admin/getShopDetail/${shopId}`);
    return response.data;
  } catch (error: any) {
    // Handle errors
    if (error.response) {
      // Strapi returns errors in `error.response.data`
      console.error("Error:", error.response.data);
      throw error.response.data; // Rethrow to handle elsewhere
    } else {
      console.error("Network or unknown error:", error);
      throw new Error("Network or unknown error occurred");
    }
  }
};

const updateShopInfo = async (request: object, id: number) => {
  try {
    const json = JSON.stringify(request);
    console.log(json);
    const response = await axios.put(`${BASE_URL}/api/admin/updateShopDetail/${id}`, json, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error: any) {
    // Handle errors
    if (error.response) {
      // Strapi returns errors in `error.response.data`
      console.error("Error:", error.response.data);
      throw error.response.data; // Rethrow to handle elsewhere
    } else {
      console.error("Network or unknown error:", error);
      throw new Error("Network or unknown error occurred");
    }
  }
};



export default {
  getFADs,
  addFAD,
  getFAD,
  updateFAD,
  deleteFAD,
  getShopDetail,
  getAllVouchers,
  addVoucher,
  getVoucher,
  updateVoucher,
  deleteVoucher,
  getShopInfo,
  updateShopInfo
};