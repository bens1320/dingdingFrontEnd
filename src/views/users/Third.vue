<template>
    <Report :reportType="reportType"/>
</template>

<script>
    import Report from "@/views/users/Report";
    export default {
        name: "Third",
        components:{
            Report
        },
        data(){
            return {
                reportType: "third"
            }
        }
    }
</script>

<style scoped>

</style>