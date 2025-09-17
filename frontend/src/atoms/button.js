const refreshData = async () => {
    setLoading(true);
    const result = await fetchPanelInformations();
    setHyperplanningData(result);
    setLoading(false);   
}

export default refreshData;
