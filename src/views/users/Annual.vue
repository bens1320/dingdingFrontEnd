<template>
    <Report :reportType="reportType"/>
</template>

<script>
    import Report from "@/views/users/Report";
    export default {
        name: "Annual",
        components:{
            Report
        },
        data(){
            return {
                reportType: "annual"
            }
        }
    }
</script>

<style scoped>

</style>