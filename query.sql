CREATE FUNCTION update_penjualan() RETURNS trigger AS $update_penjualan$
    DECLARE
    stok_lama INTEGER;
    sum_harga NUMERIC;
    
    BEGIN
        IF (TG_OP = 'INSERT') THEN
            --update stok
            SELECT stok INTO stok_lama FROM barang WHERE kode_barang = NEW.kode_barang;
            UPDATE barang SET stok = stok_lama - NEW.qty WHERE kode_barang = NEW.kode_barang;

        ELSIF (TG_OP = 'UPDATE')
            --update stok 
            SELECT stok INTO stok_lama FROM barang WHERE kode_barang = NEW.kode_barang;
            UPDATE barang SET stok = stok_lama + NEW.qty WHERE kode_barang = NEW.kode_barang;
        IF (TG_OP = 'DELETE') THEN
            --update stok
            SELECT stok INTO stok_lama FROM barang WHERE kode_barang = NEW.kode_barang;
            UPDATE barang SET stok = stok_lama + NEW.qty WHERE kode_barang = NEW.kode_barang;
        END IF;
            --update penjualan
            SELECT sum(total_harga) INTO sum_harga FROM detail_penjualan WHERE no_invoice = NEW.no_invoice;
            UPDATE penjualan SET total_harga = (SELECT sum(total_harga) FROM detail_penjualan WHERE no_invoice = NEW.no_invoice) WHERE penjualan.no_invoice = NEW.no_invoice; 
  
$update_penjualan$ LANGUAGE plpgsql;

CREATE TRIGGER update_penjualan BEFORE INSERT OR UPDATE ON emp
    FOR EACH ROW EXECUTE FUNCTION update_penjualan();