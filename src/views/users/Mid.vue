<template>
    <Report :reportType="reportType"/>
</template>

<script>
    import Report from "@/views/users/Report";
    export default {
        name: "Mid",
        components:{
            Report
        },
        data(){
            return {
                reportType: "mid"
            }
        }
    }
</script>

<style scoped>

</style>