import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getFileALLAPI } from "@/apis/SeminarCentre";

export const useResourcesStore = defineStore('Resources', () => {
    const List = ref([]);

    const getFileALLData = async () => {
        let res = await getFileALLAPI()
        List.value = res.data
    }

    return {
        List,
        getFileALLData
    }
})
